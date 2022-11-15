using System.ComponentModel.DataAnnotations.Schema;

namespace BoardMeet.Models
{
    public class User : BaseEntity
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
        public string City { get; set; }
        public string AboutMe { get; set; }
        [InverseProperty("Players")]
        public List<Meet> JoinedMeets { get; set; }
        [InverseProperty("Author")]
        public List<Meet> CreatedMeets { get; set; }

    }
}
