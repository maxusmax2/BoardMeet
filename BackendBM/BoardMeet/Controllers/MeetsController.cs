using BoardMeet.Models;
using BoardMeet.UserException;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Text;
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
        public async Task<IActionResult> Get()
        {
            List<Meet> meets = await _context.Meets
                .Where(m=> m.Visibility())
                .Include(m => m.Players)
                .Include(m => m.Author)
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

            return Ok(meets);
        }

        // GET api/<MeetController>/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {

            var meet = await _context.Meets
                .Where(m => m.Id == id)
                .Include(m => m.Players)
                .Include(m => m.Author)
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
        [Authorize(Roles="player,organization")]
        public async Task<IActionResult> Create([FromBody] MeetCreateDTO meet)
        {
            string? error = Utils.AccessVerification(meet.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                BadRequest(error);
            }

            Meet Createdmeet = new Meet(meet);

            await _context.Meets.AddAsync(Createdmeet);

            await _context.SaveChangesAsync(true);
            return Ok(Createdmeet);
        }

        // POST api/<MeetController>
        [HttpPut("{id}")]
        [Authorize(Roles = "player,organization")]
        public async Task<IActionResult> Edit([FromBody] MeetChangeDTO meet, int id)
        {
            var meetChange = await _context.Meets.FindAsync(id);
            if (meetChange == null) 
            {
                return NotFound();
            }

            string? error = Utils.AccessVerification(meetChange.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                BadRequest(error);
            }

            meetChange.Change(meet);
            meetChange.RefreshState();

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Meets.Update(meetChange);
                    await _context.SaveChangesAsync();

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
        [Authorize(Roles =("player"))]
        public async Task<IActionResult> JoinMeet(int meetId, int userId)
        {
            string? error = Utils.AccessVerification(userId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                BadRequest(error);
            }

            var user = await _context.Users
                .FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }

            var meet = await _context.Meets
                .Include(m => m.Players)
                .Where(m => m.Id == meetId)
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

            return Ok();
        }
        [HttpDelete("ExitMeet/{meetId}/User/{userId}")]
        [Authorize(Roles ="player")]
        public async Task<IActionResult> ExitMeet(int meetId, int userId)
        {
            string? error = Utils.AccessVerification(userId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                BadRequest(error);
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            var meet = await _context.Meets
                .Include(m => m.Players)
                .Where(m => m.Id == meetId)
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

            return Ok();
        }

        // DELETE api/<MeetController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles ="player,organization")]
        public async Task<StatusCodeResult> Delete(int id)
        {
            
            var m = await _context.Meets.FindAsync(id);
            if(m.Removed())
            {
            
                if (m != null)
                {
                    try
                    {
                        Utils.AccessVerification(m.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
                    }
                    catch (NotAccessException ex)
                    {
                        BadRequest(ex.Message);
                    }
                    catch (NotAuthorizedException ex)
                    {
                        BadRequest(ex.Message);
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
        public async Task<StatusCodeResult> Lock(int id)
        {
            Meet meet = await _context.Meets.FirstOrDefaultAsync(m => m.Id == id);
            if (meet != null)
            {
                string? error = Utils.AccessVerification(meet.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
                if (error != null)
                {
                    BadRequest(error);
                }
                if (meet.Lock()) 
                {
                    await _context.SaveChangesAsync(true);
                    return Ok();
                }
            }
            return BadRequest();
        }
        [HttpPost("Open/{id}")]
        [Authorize(Roles = "player,organization")]
        public async Task<StatusCodeResult> Open(int id)
        {
            Meet meet = await _context.Meets.FirstOrDefaultAsync(m => m.Id == id);
            if (meet != null)
            {
                string? error = Utils.AccessVerification(meet.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
                if (error != null)
                {
                    BadRequest(error);
                }
                if (meet.Open())
                {
                    await _context.SaveChangesAsync(true);
                    return Ok();
                }
            }
            return BadRequest();
        }

        [HttpPost("Search")]
        public async Task<IActionResult> SearchMeet(SearchValMeet searchValue)
        {
            List<Meet> searchMeet;
            if(searchValue == null) 
            {
                return Ok( await _context.Meets.ToListAsync());
            }

            if (searchValue.City == null && searchValue.Date != null)
            {
                DateTime searchDate = ((DateTime)searchValue.Date).Date;
                searchMeet = await _context.Meets
                    .Where(m => m.Date.Date == searchDate)
                    .Include(m => m.Players)
                    .Include(m => m.Author)
                    .ToListAsync();
            }
            else if (searchValue.Date == null && searchValue.City != null)
            {
                searchMeet = await _context.Meets
                    .Where(m => m.City == searchValue.City)
                    .Include(m => m.Players)
                    .Include(m => m.Author)
                    .ToListAsync();
            }
            else if (searchValue.Date == null && searchValue.City == null)
            {
                return BadRequest("Нет данных для поиска");
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
            foreach(Meet meet in searchMeet) 
            {
                meet.RefreshState();
            }
            await _context.SaveChangesAsync(); 
            return Ok(searchMeet);
        }

        private bool MeetExists(int id)
        {
            return _context.Meets.Any(e => e.Id == id);
        }
    }
}
