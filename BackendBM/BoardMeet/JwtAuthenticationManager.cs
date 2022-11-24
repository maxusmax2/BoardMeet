using BoardMeet.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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

        public string Authenticate(User user, string password)
        {
                
                bool verify = BCrypt.Net.BCrypt.Verify(password, user.Password);

                if (!verify) 
                {
                    throw new AuthenticateException("Не верный пароль");
                }
   
            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            var tokenKey = Encoding.ASCII.GetBytes(key);

            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.Email),
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
