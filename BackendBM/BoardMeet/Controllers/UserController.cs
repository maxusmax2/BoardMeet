using BoardMeet.Models;
using BoardMeet.UserException;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace BoardMeet.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly JwtAuthenticationManager jwtAuthenticationManager;
        private readonly RegistrationManager registrationManager;

        public UserController(JwtAuthenticationManager jwtAuthenticationManager, RegistrationManager registrationManager)
        {
            this.jwtAuthenticationManager = jwtAuthenticationManager;
            this.registrationManager = registrationManager;
        }

        [AllowAnonymous]
        [HttpPost("Authorize")]
        public IActionResult AuthenticationUser([FromBody] User user)
        {
            string token;

            try
            {
                token = jwtAuthenticationManager.Authenticate(user);
            }
            catch (AuthenticateException ex)
            {
                return Unauthorized(ex.Message);
            }

            return Ok(token);
        }

        [AllowAnonymous]
        [HttpPost("Registration")]
        public IActionResult RegistrationUser([FromBody] User user)
        {
            try 
            {
                user = registrationManager.Registration(user);
            }
            catch(RegistrationException ex) 
            {
                return BadRequest(ex.Message);
            }
            
            using (ApplicationContext db = new ApplicationContext())
            {
                db.Users.Add(user);
                db.SaveChanges();
            }
            return Ok(user);
        }
        
    }
}
