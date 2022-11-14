namespace BoardMeet.Models
{
    public class BoardGame : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string RangeOfPlayers { get; set; }

    }
}
