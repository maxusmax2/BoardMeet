using BoardMeet.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<Meet> meet = await _context.Meets
            .Include(m => m.Players)
            .Include(m => m.Author)
                .ToListAsync();
            if (meet == null)
            {
                return NotFound();
            }

            return Ok(meet);

        }

        // GET api/<MeetController>/5
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

            return Ok(meet);

        }
        // POST api/<MeetController>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] Meet meet)
        {

            await _context.Meets.AddAsync(meet);

            await _context.SaveChangesAsync(true);
            return Ok(meet);
        }

        // POST api/<MeetController>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> Edit([FromBody] Meet EditMeet, int id)
        {
            if (id != EditMeet.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Meets.Update(EditMeet);
                    await _context.SaveChangesAsync();

                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!MeetExists(EditMeet.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return Ok(EditMeet);
            }
            return Ok(EditMeet);
        }

        // POST api/<MeetController>
        [HttpPost("JoinMeet/{meetId}/User/{userId}")]
        [Authorize]
        public async Task<IActionResult> JoinMeet(int meetId, int userId)
        {
            User user = await _context.Users
                .FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            Meet? meet = await _context.Meets
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
            await _context.SaveChangesAsync(true);

            return Ok();

        }
        [HttpDelete("ExitMeet/{meetId}/User/{userId}")]
        [Authorize]
        public async Task<IActionResult> ExitMeet(int meetId, int userId)
        {
            User? user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            Meet? meet = await _context.Meets
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
            await _context.SaveChangesAsync(true);

            return Ok();

        }

        // DELETE api/<MeetController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<StatusCodeResult> Delete(int id)
        {
            Meet? m = await _context.Meets.FindAsync(id);
            if (m != null)
            {
                _context.Meets.Attach(m);
                _context.Meets.Remove(m);
                await _context.SaveChangesAsync(true);
                return StatusCode(200);
            }
            return BadRequest();
        }
        [HttpGet("Search")]
        public async Task<IActionResult> SearchMeet(SearchValMeet searchValue)
        {
            List<Meet> searchMeet = null;
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
                    .Where(m => m.City == searchValue.City)
                    .Where(m => m.Date.Date == searchDate)
                    .Include(m => m.Players)
                    .Include(m => m.Author)
                    .ToListAsync();
            }
            return Ok(searchMeet);
        }
        [HttpGet("SearchDate/{Date}")]

        private bool MeetExists(int id)
        {
            return _context.Meets.Any(e => e.Id == id);
        }
    }
}
