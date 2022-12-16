namespace BoardMeet.UserException
{
    public class NotAuthorizedException : Exception
    {
        public NotAuthorizedException(string message)
            : base(message) { }
    }
}
