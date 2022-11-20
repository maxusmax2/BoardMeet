using BoardMeet.Models;
using BoardMeet.UserException;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Drawing2D;

namespace BoardMeet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly JwtAuthenticationManager jwtAuthenticationManager;
        private readonly RegistrationManager registrationManager;
        private readonly ApplicationContext _context;

        public UserController(JwtAuthenticationManager jwtAuthenticationManager, RegistrationManager registrationManager, ApplicationContext context)
        {
            _context = context;
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            this.registrationManager = registrationManager;
        }


        [AllowAnonymous]
        [HttpPost("Authorize")]
        public async Task<IActionResult> AuthenticationUser([FromBody] AuthData auth)
        {
            string token;

            try
            {
                User AuthUser = await _context.Users.Where(x => x.Email == auth.Email).FirstOrDefaultAsync();
                
                if (AuthUser == null)
                {
                    throw new AuthenticateException("Юзера с таким именем нет");
                }
                token = jwtAuthenticationManager.Authenticate(AuthUser, auth.Password);
            }
            catch (AuthenticateException ex)
            {
                return Unauthorized(ex.Message);
            }

            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost("Registration")]
        public async Task<IActionResult> RegistrationUser([FromBody] RegistartionData registartionData)
        {
            try
            { 
                User UserExist = await _context.Users.FirstOrDefaultAsync(x => x.Email == registartionData.User.Email);
                if (UserExist == null) 
                {
                    throw new RegistrationException("Юзер с таким мылом уже есть");
                }
                registartionData.User = registrationManager.Registration(registartionData.User, registartionData.Password);
            }
            catch (RegistrationException ex)
            {
                return BadRequest(ex.Message);
            }

            _context.Users.Add(registartionData.User);
            await _context.SaveChangesAsync();

            return Ok(registartionData.User);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _context.Users
            .Include(u => u.CreatedMeets)
            .Include(u => u.JoinedMeets)
            .Where(u => u.Id == id)
            .FirstOrDefaultAsync();
            if(user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<StatusCodeResult> Delete(int id)
        {
            var u = await _context.Users.FindAsync(id);
            if (u != null)
            {
                _context.Users.Attach(u);
                _context.Users.Remove(u);
                await _context.SaveChangesAsync(true);
                return StatusCode(200);
            }
            return BadRequest();
        }

        
        [AllowAnonymous]
        [HttpGet("JoinedMeet/{id}")]
        public async Task<IActionResult> GetJoinedMeet(int id)
        {
            var user = await _context.Users
            .Include(u => u.JoinedMeets)
            .ThenInclude(u => u.Author)
            .Where(u => u.Id == id)
            .FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.JoinedMeets);
        }

        [AllowAnonymous]
        [HttpGet("CreatedMeet/{id}")]
        public async Task<IActionResult> GetCreatedMeet(int id)
        {
            var user = await _context.Users
            .Include(u => u.CreatedMeets)
            .ThenInclude(u => u.Author)
            .Include(u => u.CreatedMeets)
            .Where(u => u.Id == id)
            .FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.CreatedMeets);
        }

    }
}
