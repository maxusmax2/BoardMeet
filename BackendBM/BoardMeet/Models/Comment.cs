namespace BoardMeet.Models
{
    public class Comment : BaseEntity
    {
        public string Body { get; set; }
        public int Rating { get; set; }
        public int WeightGame { get; set; }
        public int GameTime { get; set; }
        public int BestPlayerMin { get; set; }
        public int BestPlayerMax { get; set; }
        public int AgePlayer { get; set; }

        public User? Author { get; set; }
        public int AuthorId { get; set; }
        public BoardGame? Game { get; set; }
        public int GameId { get; set; }

        public Comment() { }
        public Comment(CommentCreateDTO dto) 
        {
            Body = dto.Body;
            Rating= dto.Rating;
            WeightGame= dto.WeightGame;
            GameTime= dto.GameTime;
            BestPlayerMin= dto.BestPlayerMin;
            BestPlayerMax= dto.BestPlayerMax;
            AgePlayer= dto.AgePlayer;
            AuthorId= dto.AuthorId;
            GameId= dto.GameId;
        }
    }
}
namespace BoardMeet.Models
{
    public class CommentCreateDTO 
    {
        public string Body { get; set; }
        public DateTime? Date { get; set; }
        public int Rating { get; set; }
        public int WeightGame { get; set; }
        public int GameTime { get; set; }
        public int BestPlayerMin { get; set; }
        public int BestPlayerMax { get; set; }
        public int AgePlayer { get; set; }
        public int AuthorId { get; set; }
        public int GameId { get; set; }
    }
}