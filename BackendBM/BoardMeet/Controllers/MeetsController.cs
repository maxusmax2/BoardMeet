using BoardMeet.Models;
using BoardMeet.UserException;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace BoardMeet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetsController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IWebHostEnvironment _appEnvironment;
        public MeetsController(ApplicationContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/<MeetController>
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetMeets()
        {
            var meets = await _context.Meets
                .Select
                ( m => new Meet
                {
                    Id = m.Id,
                    Name = m.Name,
                    Duration= m.Duration,
                    PeopleCount = m.PeopleCount,
                    PeopleCountMax = m.PeopleCountMax,
                    Link = m.Link,
                    Date = m.Date,
                    State = m.State,
                    Location = m.Location,
                    City = m.City,
                    Games = m.Games,
                    AuthorId = m.AuthorId,
                    Author = m.Author,
                    Players = m.Players
                }
                )
                .ToListAsync();


            if (meets == null)
            {
                return NotFound();
            }

            foreach (Meet meet in meets)
            {

                meet.RefreshState();
            }
            
            await _context.SaveChangesAsync();
           

            return Ok(meets.Where(m => m.Visibility()));
        }

        // GET api/<MeetController>/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMeet(int id)
        {
            var meet = await _context.Meets
                .Where(m => m.Id == id)
                .Select
                (m => new Meet
                {
                    Id = m.Id,
                    Name = m.Name,
                    Duration = m.Duration,
                    PeopleCount = m.PeopleCount,
                    PeopleCountMax = m.PeopleCountMax,
                    Link = m.Link,
                    Date = m.Date,
                    State = m.State,
                    Location = m.Location,
                    City = m.City,
                    Games = m.Games,
                    AuthorId = m.AuthorId,
                    Author = m.Author,
                    Players = m.Players
                }
                )
                .FirstOrDefaultAsync();

            if (meet == null)
            {
                return NotFound();
            }

           

            meet.RefreshState();
            await _context.SaveChangesAsync();
            return Ok(meet);
        }
        // POST api/<MeetController>
        [HttpPost]
        [Authorize(Roles = "player,organization")]
        public async Task<IActionResult> PostMeet([FromBody] MeetCreateDTO meet)
        {
            string? error = Utils.AccessVerification(meet.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }

            Meet Createdmeet = new Meet(meet);

            await _context.Meets.AddAsync(Createdmeet);

            await _context.SaveChangesAsync();
            return Ok(Createdmeet);
        }

        // POST api/<MeetController>
        [HttpPut("{id}")]
        [Authorize(Roles = "player,organization")]
        public async Task<IActionResult> PutMeet([FromBody] MeetChangeDTO meet, int id)
        {
            var meetChange = await _context.Meets.FindAsync(id);
            if (meetChange == null)
            {
                return NotFound();
            }

            string? error = Utils.AccessVerification(meetChange.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }
            
            meetChange.Change(meet);
            meetChange.RefreshState();
            if (meetChange.Players.Count() == meet.Players.Count())
            {
                meetChange.Players = meet.Players = null;
            }
           
            if (ModelState.IsValid)
            {
                try
                {
                    _context.Meets.Update(meetChange);
                    await _context.SaveChangesAsync(true);

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MeetExists((int)meetChange.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
            }
            return Ok(meetChange);
        }

        // POST api/<MeetController>
        [HttpPost("JoinMeet/{meetId}/User/{userId}")]
        [Authorize(Roles = ("player"))]
        public async Task<IActionResult> JoinMeet(int meetId, int userId)
        {
            string? error = Utils.AccessVerification(userId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }

            var user = await _context.Users
                .FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var meet = await _context.Meets
                .Where(m => m.Id == meetId)
                .Include(m => m.Players)
                .Include(m => m.Author)
                .FirstOrDefaultAsync();
            if (meet == null)
            {
                return NotFound();
            }

            if (meet.AuthorId == userId)
            {
                return BadRequest("Автор мероприятия не может быть участником");
            }

            if (meet.Players == null)
            {
                meet.Players = new List<User>();
            }

            meet.Players.Add(user);
            meet.PeopleCount++;
            meet.RefreshState();
            await _context.SaveChangesAsync(true);

            return Ok(meet);
        }
        [HttpDelete("ExitMeet/{meetId}/User/{userId}")]
        [Authorize(Roles = "player")]
        public async Task<IActionResult> ExitMeet(int meetId, int userId)
        {
            string? error = Utils.AccessVerification(userId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            var meet = await _context.Meets
                .Where(m => m.Id == meetId)
                .Include(m => m.Players)
                .Include(m => m.Author)
                .FirstOrDefaultAsync();
            if (meet == null)
            {
                return NotFound();
            }
            if (meet.Players == null)
            {
                meet.Players = new List<User>();
            }

            meet.Players.Remove(user);
            meet.PeopleCount--;
            meet.RefreshState();
            await _context.SaveChangesAsync(true);

            return Ok(meet);
        }

        // DELETE api/<MeetController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "player,organization")]
        public async Task<IActionResult> DeleteMeet(int id)
        {

            var m = await _context.Meets.FindAsync(id);
            if(m == null) 
            {
                return BadRequest("Комментария не существует");
            }
            if (m.Removed())
            {

                if (m != null)
                {
                    string? error = Utils.AccessVerification(m.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
                    if (error != null)
                    {
                        return BadRequest(error);
                    }
                    _context.Meets.Attach(m);
                    _context.Meets.Remove(m);
                    await _context.SaveChangesAsync(true);
                    return StatusCode(200);
                }
            }
            return BadRequest();
        }
        [HttpPost("Lock/{id}")]
        [Authorize(Roles = "player,organization")]
        public async Task<IActionResult> LockMeet(int id)
        {
            Meet meet = await _context.Meets
                .Where(m => m.Id == id)
                .Include(m => m.Players)
                .Include(m => m.Author)
                .FirstOrDefaultAsync();
            if (meet != null)
            {
                string? error = Utils.AccessVerification(meet.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
                if (error != null)
                {
                    return BadRequest(error);
                }
                if (meet.Lock())
                {
                    await _context.SaveChangesAsync(true);
                    return Ok(meet);
                }
            }
            return BadRequest();
        }
        [HttpPost("Open/{id}")]
        [Authorize(Roles = "player,organization")]
        public async Task<IActionResult> OpenMeet(int id)
        {
            Meet meet = await _context.Meets
                .Where(m => m.Id == id)
                .Include(m => m.Players)
                .Include(m => m.Author)
                .FirstOrDefaultAsync();
            if (meet != null)
            {
                string? error = Utils.AccessVerification(meet.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
                if (error != null)
                {
                    return BadRequest(error);
                }
                if (meet.Open())
                {
                    await _context.SaveChangesAsync(true);
                    return Ok(meet);
                }
            }
            return BadRequest();
        }

        [HttpPost("Search")]
        public async Task<IActionResult> SearchMeet(SearchValMeet searchValue)
        {
            List<Meet> searchMeet;


            if (searchValue.City == "" && searchValue.Date != null)
            {
                DateTime searchDate = ((DateTime)searchValue.Date).Date;
                searchMeet = await _context.Meets
                    .Where(m => m.Date.Date == searchDate)
                    .Include(m => m.Players)
                    .Include(m => m.Author)
                    .ToListAsync();
            }
            else if (searchValue.Date == null && searchValue.City != "")
            {
                searchMeet = await _context.Meets
                    .Where(m => m.City == searchValue.City)
                    .Include(m => m.Players)
                    .Include(m => m.Author)
                    .ToListAsync();
            }
            else if (searchValue.Date == null && searchValue.City == "")
            {
                return await GetMeets();
            }
            else
            {
                DateTime searchDate = ((DateTime)searchValue.Date).Date;
                searchMeet = await _context.Meets
                    .Where(m => m.City.Contains(searchValue.City))
                    .Where(m => m.Date.Date == searchDate)
                    .Include(m => m.Players)
                    .Include(m => m.Author)
                    .ToListAsync();
            }
            foreach (Meet meet in searchMeet)
            {
                meet.RefreshState();
            }
            await _context.SaveChangesAsync();
            return Ok(searchMeet.Where(m => m.Visibility()));
        }
        [AllowAnonymous]
        [HttpGet("JoinedMeet/{id}")]
        public async Task<IActionResult> GetJoinedMeet(int id)
        {
            var user = await _context.Users
                .Include(u => u.JoinedMeets)
                .ThenInclude(u => u.Players)
                .Include(u => u.JoinedMeets)
                .ThenInclude(u => u.Author)
                .Where(u => u.Id == id)
                .FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }

            foreach (Meet meet in user.JoinedMeets)
            {
                meet.RefreshState();
            }
            await _context.SaveChangesAsync();

            return Ok(user.JoinedMeets);
        }

        [AllowAnonymous]
        [HttpGet("CreatedMeet/{id}")]
        public async Task<IActionResult> GetCreatedMeet(int id)
        {
            var user = await _context.Users
            .Include(u => u.CreatedMeets)
            .ThenInclude(u => u.Players)
            .Include(u => u.CreatedMeets)
            .ThenInclude(u => u.Author)
            .Where(u => u.Id == id)
            .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            foreach (Meet meet in user.CreatedMeets)
            {
                meet.RefreshState();
            }
            await _context.SaveChangesAsync();

            return Ok(user.CreatedMeets);
        }
        private bool MeetExists(int id)
        {
            return _context.Meets.Any(e => e.Id == id);
        }
    }
}
