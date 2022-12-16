using BoardMeet.Models;

namespace BoardMeet
{
    public class RegistrationManager
    {
        public void Registration(User user, string password)
        {
            user.Password = (BCrypt.Net.BCrypt.HashPassword(password));
        }
    }
}
