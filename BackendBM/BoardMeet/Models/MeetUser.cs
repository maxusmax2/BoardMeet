namespace BoardMeet.Models
{
    public class MeetUser:BaseEntity
    {
        public int? MeetId { get; set; }
        public  Meet? Meet { get; set; }
        public int? UserId { get; set; }
        public User? User { get; set; }
    }
}
