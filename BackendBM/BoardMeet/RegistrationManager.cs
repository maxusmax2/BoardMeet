using BoardMeet.Models;
using BoardMeet.UserException;

namespace BoardMeet
{
    public class RegistrationManager
    {
        public User Registration(User user)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                bool UserExist = db.Users.FirstOrDefault(x => x.UserName == user.UserName) != null;

                if (UserExist)
                {
                    throw new RegistrationException("Юзер с таким именем уже есть");
                }

            }
            string hash = BCrypt.Net.BCrypt.HashPassword(user.Password);

            user.Password = hash;

            return user;
        }
    }
}
