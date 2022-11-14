using System.Text.Json.Serialization;

namespace BoardMeet.Models
{
    public class BaseEntity
    {
        [JsonIgnore]
        public int Id { get; set; }
    }
}
