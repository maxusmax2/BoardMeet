using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoardMeet.Models
{
    public class Meet : BaseEntity
    {
        
        public string Name { get; set; }
        public int PeopleCount { get; set; }
        public int PeopleCountMax { get; set; }
        public int Duration { get; set; }
        public string? Link { get; set; }
        public DateTime Date { get; set; }
        public MeetState MeetState { get; set; }
        public string Location { get; set; }
        public string City { get; set; }
        public string Games { get; set; }
        public int AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public User? Author { get; set; }
        public virtual List<User>? Players { get; set; }
        public Meet() { }
        public Meet(MeetCreateDTO dto) 
        {
            Name = dto.Name;
            PeopleCount = dto.PeopleCount;
            PeopleCountMax = dto.PeopleCountMax;
            Duration = dto.Duration;
            Link = dto.Link;
            Date = dto.Date;
            Location = dto.Location;
            City = dto.City;
            Games = dto.Games;
            AuthorId = dto.AuthorId;
            MeetState = MeetState.Recruiting;
        }

    }

    public class MeetCreateDTO 
    {
        public string Name { get; set; }
        public int PeopleCount { get; set; }
        public int PeopleCountMax { get; set; }
        public int Duration { get; set; }
        public string? Link { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string City { get; set; }
        public string Games { get; set; }
        public int AuthorId { get; set; }
    }
    public enum MeetState 
    {
        Recruiting,
        InProgressOpen,
        InProgressLock,
        Finished,
    }

}