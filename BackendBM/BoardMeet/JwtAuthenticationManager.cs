using BoardMeet.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Linq;
using BoardMeet.UserException;

namespace BoardMeet
{
    public class JwtAuthenticationManager
    {
        private readonly string key;

        public JwtAuthenticationManager(string key)
        {
            this.key = key;
        }

        public string Authenticate(User user)
        {

            using (ApplicationContext db = new ApplicationContext())
            {
                User authUser = db.Users.Where(x => x.UserName == user.UserName).FirstOrDefault();
                if (authUser == null)
                {
                    throw new AuthenticateException("Юзера с таким именем нет");
                }

                bool verify = BCrypt.Net.BCrypt.Verify(user.Password, authUser.Password);

                if (!verify) 
                {
                    throw new AuthenticateException("Не верный пароль");
                }

            }
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(tokenKey),
                    SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
