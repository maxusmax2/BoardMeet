using BoardMeet.UserException;
using System.Security.Claims;
using System.Security.Principal;

namespace BoardMeet
{
    public static class Utils
    {
        public static  void AccessVerification(int id, ClaimsIdentity identity )
        {
            if (identity != null)
            {
                var verifidedId = int.Parse(identity.Claims.First(c => c.Type.ToString() == "id").Value);
                var role = identity.Claims.First(c => c.Type == ClaimTypes.Role).Value;
                if (role == "admin" || verifidedId == id)
                {
                    return;
                }
                else
                {
                    throw new NotAccessException("Нет доступа");
                }
            }
            else
            {
                throw new NotAuthorizedException("Пользователь не авторизован");
            }

        }
    }
}
