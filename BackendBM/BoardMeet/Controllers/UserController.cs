using BoardMeet.Models;
using BoardMeet.UserException;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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
        private IWebHostEnvironment _hostingEnvironment;

        public UserController(JwtAuthenticationManager jwtAuthenticationManager, RegistrationManager registrationManager, ApplicationContext context, IWebHostEnvironment environment)
        {
            _context = context;
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            this.registrationManager = registrationManager;
            _hostingEnvironment = environment;
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
                if (UserExist != null) 
                {
                    throw new RegistrationException("Юзер с таким мылом уже есть");
                }
                registartionData.User = registrationManager.Registration(registartionData.User, registartionData.Password);
            }
            catch (RegistrationException ex)
            {
                return BadRequest(ex.Message);
            }
            registartionData.User.AvatarUrl = "images/default.png";
            _context.Users.Add(registartionData.User);
            await _context.SaveChangesAsync();

            return Ok(registartionData.User);
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = await _context.Users
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
            .ThenInclude(u => u.Players)
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
            .ThenInclude(u => u.Players)
            .Include(u => u.CreatedMeets)
            .ThenInclude(u => u.Author)

            .Where(u => u.Id == id)
            .FirstOrDefaultAsync();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.CreatedMeets);
        }
        [HttpPost("SaveAvatar/{id}")]
        public async Task<IActionResult> SaveAvatar(IFormFile file, int id) 
        {
            string filePath;
            string filetype;
            string uploads = Path.Combine("C:\\Users\\maxus\\OneDrive\\images", "");
            if(file.ContentType != null)
            { 

                if (file.ContentType[0..6]  == "image/")
                {
                    filetype = "."+file.ContentType[6..file.ContentType.Length];
                }
                else 
                {
                    return BadRequest("Файл не картинка");
                }
            }
            else
            {
                return BadRequest("Файл пуст");
            }
            var FileNameUnique = System.Guid.NewGuid().ToString() + filetype;
            if (file.Length > 0)
            {
                filePath = Path.Combine(uploads, FileNameUnique);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                User user = await _context.Users.FirstAsync(u => u.Id == id);
                user.AvatarUrl = "images/" + FileNameUnique;
                await _context.SaveChangesAsync();
                return Ok(file);
            }
            return BadRequest();
           
        }

    }
}
