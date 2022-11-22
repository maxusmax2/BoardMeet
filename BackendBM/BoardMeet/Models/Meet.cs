using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.ModelBinding;
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
        public DateTime? Date { get; set; }
        public string Location { get; set; }
        public string Games { get; set; }
        
        public int? AuthorId { get; set; }
        [ForeignKey("AuthorId")]
        public  User? Author { get; set; }

        public virtual List<User>? Players { get; set; }

       
    }
}
