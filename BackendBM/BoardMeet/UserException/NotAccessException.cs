namespace BoardMeet.UserException
{
    public class NotAccessException : Exception
    {
        public NotAccessException(string message)
           : base(message) { }
    }
}
