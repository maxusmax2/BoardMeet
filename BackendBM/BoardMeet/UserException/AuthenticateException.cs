namespace BoardMeet.UserException
{
    public class AuthenticateException : Exception
    {
        public AuthenticateException(string message)
            : base(message) { }
    }
}
