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
        public string? GameRool { get; set; }
        public string? GameAvatar { get; set; }
        public string AuthorsGame { get; set; }
        public string Genre { get; set; }
        public string Artists { get; set; }
        public string Publishers { get; set; }
        public User? Author { get; set; }
        public int AuthorId { get; set; }
        public int СountComment { get; set; }
        public List<Comment>? Comments { get; set; }

        public BoardGame() { }
        public BoardGame(BoardGameCreateDTO dto) 
        {
            Name = dto.Name;
            RangeOfPlayersMax = dto.RangeOfPlayersMax;
            RangeOfPlayersMin = dto.RangeOfPlayersMin;
            GameTime = dto.GameTime;
            BestRangeOfPlayersMaxUser = 0;
            BestRangeOfPlayersMinUser = 0;
            GameTimeUser = 0;
            RatingUser = 0;
            Description = dto.Description;
            WeightGameUser = 0;
            AgePlayer = dto.AgePlayer;
            AgePlayerUser = 0;
            AuthorId = dto.AuthorId;
            СountComment = 0;
            Genre = dto.Genre;
            AuthorsGame = dto.AuthorsGame;
            Artists = dto.Artists;
            Publishers = dto.Publishers;
        }
        public void Change(BoardGameChangeDTO dto) 
        {
            Name = dto.Name;
            RangeOfPlayersMax = dto.RangeOfPlayersMax;
            RangeOfPlayersMin = dto.RangeOfPlayersMin;
            GameTime = dto.GameTime;
            Description = dto.Description;
            AgePlayer = dto.AgePlayer;
            Genre = dto.Genre;
            AuthorsGame = dto.AuthorsGame;
            Artists = dto.Artists;
            Publishers= dto.Publishers;
        }
    }
}
namespace BoardMeet.Models
{
    public class BoardGameCreateDTO
    {
        public string Name { get; set; }
        public float RangeOfPlayersMin { get; set; }
        public float RangeOfPlayersMax { get; set; }
        public int GameTime { get; set; }
        public string Description { get; set; }
        public int AgePlayer { get; set; }
        public string AuthorsGame { get; set; }
        public string Genre { get; set; }
        public string Artists { get; set; }
        public string Publishers { get; set; }
        public int AuthorId { get; set; }
        public IFormFile? rule { get; set; }
        public IFormFile? avatarGame { get; set; }
    }

    public class BoardGameChangeDTO
    {
        public string Name { get; set; }
        public string AuthorsGame { get; set; }
        public string Genre { get; set; }
        public string Artists { get; set; }
        public string Publishers { get; set; }
        public float RangeOfPlayersMin { get; set; }
        public float RangeOfPlayersMax { get; set; }
        public int GameTime { get; set; }
        public string Description { get; set; }
        public int AgePlayer { get; set; }
    }
}
