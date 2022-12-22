using BoardMeet.Models;
using BoardMeet.UserException;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Security.Claims;

namespace BoardMeet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly JwtAuthenticationManager jwtAuthenticationManager;
        private readonly RegistrationManager registrationManager;
        private readonly ApplicationContext _context;
        private readonly IWebHostEnvironment _appEnvironment;

        public UsersController(JwtAuthenticationManager jwtAuthenticationManager, RegistrationManager registrationManager, ApplicationContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context;
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            this.registrationManager = registrationManager;
            _appEnvironment = appEnvironment;
        }

        [AllowAnonymous]
        [HttpPost("Authorize")]
        public async Task<IActionResult> Authentication([FromBody] AuthData auth)
        {
            AuthResponse respAuth;
            try
            {
                respAuth = await GetAuthResponse(auth);
            }
            catch (AuthenticateException ex)
            {
                return BadRequest(ex.Message);
            }
            var resp = new HttpResponseMessage();
            HttpContext.Response.Cookies.Append("token", respAuth.token);
            HttpContext.Response.Cookies.Append("AuthUser", respAuth.AuthUser.ToJson());
            return Ok(respAuth);
        }

        [AllowAnonymous]
        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody] RegistartionData registartionData)
        {

            try
            {
                if (await _context.Users.FirstOrDefaultAsync(x => x.Email == registartionData.user.Email) != null)
                {
                    throw new RegistrationException("Юзер с таким мылом уже есть");
                }

            }
            catch (RegistrationException ex)
            {
                return BadRequest(ex.Message);
            }
            User user = new User(registartionData.user);
            registrationManager.Registration(user, registartionData.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            AuthResponse respAuth;
            AuthData auth = new AuthData();
            auth.Email = user.Email;
            auth.Password = registartionData.Password;

            try
            {
                respAuth = await GetAuthResponse(auth);
            }
            catch (AuthenticateException ex)
            {
                return BadRequest(ex.Message);
            }
            var resp = new HttpResponseMessage();
            HttpContext.Response.Cookies.Append("token", respAuth.token);
            HttpContext.Response.Cookies.Append("AuthUser", respAuth.AuthUser.ToJson());
            return Ok(respAuth);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Include(u => u.CreateBoardGames)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPost("SaveAvatar/{id}")]
        [Authorize]
        public async Task<IActionResult> SaveAvatar(IFormFile file, int id)
        {
            string? error = Utils.AccessVerification(id, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }

            string filePath;
            string filetype;

            if (file.ContentType != null)
            {

                if (file.ContentType[0..6] == "image/")
                {
                    filetype = "." + file.ContentType[6..file.ContentType.Length];
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
                filePath = Path.Combine(_appEnvironment.WebRootPath + "/static/User/avatar", FileNameUnique);
                using (Stream fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }
                User user = await _context.Users.FirstAsync(u => u.Id == id);
                user.AvatarUrl = "static/User/avatar/" + FileNameUnique;
                await _context.SaveChangesAsync();
                return Ok(file);
            }
            return BadRequest();

        }
        private async Task<AuthResponse?> GetAuthResponse(AuthData auth)
        {

            AuthResponse Response = new AuthResponse();

            Response.AuthUser = await _context.Users.Where(x => x.Email == auth.Email).FirstOrDefaultAsync();

            if (Response.AuthUser == null)
            {
                throw new AuthenticateException("Юзера с таким именем нет");
            }
            Response.token = jwtAuthenticationManager.Authenticate(Response.AuthUser, auth.Password);

            Response.AuthUser.Password = null;

            return Response;
        }

    }
}
