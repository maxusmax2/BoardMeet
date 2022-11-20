using System.ComponentModel.DataAnnotations.Schema;

namespace BoardMeet.Models
{
    public class BoardGame : BaseEntity
    {
        public string Name { get; set; }
        public string RangeOfPlayersMin { get; set; }
        public string RangeOfPlayersMax { get; set; }
        public int GameTime { get; set; }
        public int BestRangeOfPlayersMinUser { get; set; }
        public int BestRangeOfPlayersMaxUser { get; set; }
        public string GameTimeUser { get; set; }
        public float RatingUser { get; set; }
        public string Description { get; set; }
        public float WeightGameUser { get; set; }
        public int AgePlayer { get; set; }
        public int AgePlayerUser { get; set; }
        public string GameRool { get; set; }
        public User Author { get; set; }
        public List<Comment>? Comments { get; set; }

    }
}
