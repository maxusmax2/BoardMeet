using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BoardMeet.Models
{
    public class User : BaseEntity
    {
        public string? Email { get; set; }
        [JsonIgnore]
        public string? Password { get; set; }
        public string? UserName { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; }
        public string? AvatarUrl { get; set; }
        public string? City { get; set; }
        public string? AboutMe { get; set; }

        [InverseProperty("Players")]
        public virtual List<Meet>? JoinedMeets { get; set; }

        [InverseProperty("Author")]
        public virtual List<Meet>? CreatedMeets { get; set; }

    }
}
