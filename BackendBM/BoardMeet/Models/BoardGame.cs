namespace BoardMeet.Models
{
    public class BoardGame : BaseEntity
    {
        public string Name { get; set; }
        public float RangeOfPlayersMin { get; set; }
        public float RangeOfPlayersMax { get; set; }
        public int GameTime { get; set; }
        public float BestRangeOfPlayersMinUser { get; set; }
        public float BestRangeOfPlayersMaxUser { get; set; }
        public float GameTimeUser { get; set; }
        public float RatingUser { get; set; }
        public string Description { get; set; }
        public float WeightGameUser { get; set; }
        public int AgePlayer { get; set; }
        public float AgePlayerUser { get; set; }
        public string GameRool { get; set; }
        public string GameAvatar { get; set; }
        public User? Author { get; set; }
        public int AuthorId { get; set; }
        public int СountComment { get; set; }
        public List<Comment>? Comments { get; set; }

    }
}
namespace BoardMeet.Models
{
    public class BoardGameCreateDto
    {
        public string Name { get; set; }
        public float RangeOfPlayersMin { get; set; }
        public float RangeOfPlayersMax { get; set; }
        public int GameTime { get; set; }
        public string Description { get; set; }
        public int AgePlayer { get; set; }
        public int AuthorId { get; set; }
    }
}
