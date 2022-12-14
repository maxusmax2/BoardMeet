using BoardMeet.Models;

namespace BoardMeet
{
    public class RegistrationManager
    {
        public User Registration(User user, string password)
        {

            string hash = BCrypt.Net.BCrypt.HashPassword(password);

            user.Password = hash;

            return user;
        }
    }
}
