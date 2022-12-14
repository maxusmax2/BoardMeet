namespace BoardMeet.Models
{
    public class Comment : BaseEntity
    {
        public string Body { get; set; }
        public DateTime Date { get; set; }
        public int Rating { get; set; }
        public int WeightGame { get; set; }
        public int GameTime { get; set; }
        public int BestPlayerMin { get; set; }
        public int BestPlayerMax { get; set; }
        public int AgePlayer { get; set; }

        public User Author { get; set; }
        public BoardGame Game { get; set; }
    }
}
