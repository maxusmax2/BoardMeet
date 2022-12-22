using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace BoardMeet.Models
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        [JsonIgnore]
        public string? Password { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
        public string City { get; set; }
        public string AboutMe { get; set; }
        public virtual ICollection<BoardGame>? CreateBoardGames { get; set; }
        public virtual ICollection<Meet>? JoinedMeets { get; set; }
        public virtual ICollection<Meet>? CreatedMeets { get; set; }
        public User() { }
        public User(UserCreateDTO dto)
        {
            Email = dto.Email;
            UserName = dto.UserName;
            Name = dto.Name;
            Role = dto.Role;
            City = dto.City;
            AboutMe = dto.AboutMe;
            AvatarUrl = "/static/User/avatar/default/" + RandomDefaultImage();

        }
        private static string[] DefaultsImage =
            {
            "smart-pepe.webp",
            "what-pepe.jpg",
            "rich-pepe.webp",
            "lovely-pepe.png",
            "gop-pepe.png",
            "garry-pepe.webp",
            "default.webp",
            "backet-pepe.png",
            "cute-pepe.jpeg"
            };

        private string RandomDefaultImage()
        {
            return DefaultsImage[new Random().Next(0, DefaultsImage.Length)];
        }
    }
}

namespace BoardMeet.Models
{
    public class UserCreateDTO
    {
        public string Email { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Role { get; set; }
        public string City { get; set; }
        public string AboutMe { get; set; }
    }

    public class RegistartionData
    {
        public UserCreateDTO user { get; set; }
        public string Password { get; set; }
    }
}
