using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace BoardMeet.Models
{
    public class Meet : BaseEntity
    {
        public string Name { get; set; }
        public int PeopleCount { get; set; }
        public int DurationMin { get; set; }
        public int DurationMax { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string Games { get; set; }
        public string Link { get; set; }
        
        public User Author { get; set; }
        //public List<User> Players { get; set; }
        public List<Comment> Comments  { get; set; }
    }
}
