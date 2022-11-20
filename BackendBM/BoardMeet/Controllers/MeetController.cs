using BoardMeet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BoardMeet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetController : ControllerBase
    {

        private readonly ApplicationContext _context;

        public MeetController(ApplicationContext context)
        {
            _context = context;
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

            Meet meet = await _context.Meets
            .Include(m => m.Players)
            .Include(m => m.Author)
            .Where(m => m.Id == id)
            .FirstOrDefaultAsync();
            
                if (meet == null)
                {
                    return NotFound();
                }

                return Ok(meet);
            
        }
        // POST api/<MeetController>
        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] Meet meet)
        {
           
            await _context.Meets.AddAsync(meet);

            await _context.SaveChangesAsync(true);
            return Ok(meet);
        }

        // POST api/<MeetController>
        [HttpPost("JoinMeet/{meetId}/User/{userId}")]
        public async Task<IActionResult> JoinMeet(int meetId,int userId)
        {
            User user = await _context.Users.FindAsync(userId);
            if (user == null) 
            {
                return NotFound();
            }
            Meet meet = await _context.Meets.FindAsync(meetId);
            if (meet == null) 
            {
                return NotFound();
            }
            if(meet.Players == null)
            {
                meet.Players = new List<User>();
            }
            meet.Players.Add(user);
            await _context.SaveChangesAsync(true);

            return Ok();
           
        }
        [HttpDelete("ExitMeet/{meetId}/User/{userId}")]
        public async Task<IActionResult> ExitMeet(int meetId, int userId)
        {
            User user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound();
            }
            Meet meet = await _context.Meets.FindAsync(meetId);
            if (meet == null)
            {
                return NotFound();
            }
            if (meet.Players == null)
            {
                meet.Players = new List<User>();
            }
            meet.Players.Remove(user);
            await _context.SaveChangesAsync(true);

            return Ok();

        }

        // DELETE api/<MeetController>/5
        [HttpDelete("{id}")]
        public async Task<StatusCodeResult> Delete(int id)
        {
            Meet m = await _context.Meets.FindAsync(id);
            if (m != null)
            {
                _context.Meets.Attach(m);
                _context.Meets.Remove(m);
                await _context.SaveChangesAsync(true);
                return StatusCode(200);
            }
            return BadRequest();
        }
    }
}
