using Microsoft.EntityFrameworkCore;

namespace BoardMeet.Models
{
    public class BoardGame : BaseEntity
    {
        public string Name { get; set; }
        public double RangeOfPlayersMin { get; set; }
        public double RangeOfPlayersMax { get; set; }
        public int GameTime { get; set; }
        public double BestRangeOfPlayersMinUser { get; set; }
        public double BestRangeOfPlayersMaxUser { get; set; }
        public double GameTimeUser { get; set; }
        public double RatingUser { get; set; }
        public string Description { get; set; }
        public double WeightGameUser { get; set; }
        public int AgePlayer { get; set; }
        public double AgePlayerUser { get; set; }
        public string? Rule { get; set; }
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

        public void AddRaitingData(Comment comment) 
        {
            RatingUser = (RatingUser * СountComment + comment.Rating) / (СountComment + 1);
            WeightGameUser = (WeightGameUser * СountComment + comment.WeightGame) / (СountComment + 1);
            AgePlayerUser = (AgePlayerUser * СountComment + comment.AgePlayer) / (СountComment + 1);
            GameTimeUser = (GameTimeUser * СountComment + comment.GameTime) / (СountComment + 1);
            BestRangeOfPlayersMaxUser = (BestRangeOfPlayersMaxUser * СountComment + comment.BestPlayerMax) / (СountComment + 1);
            BestRangeOfPlayersMinUser = (BestRangeOfPlayersMinUser * СountComment + comment.BestPlayerMin) / (СountComment + 1);
            СountComment++;
        }
        public void RemoveRaitingData(Comment comment) 
        {
            if (СountComment <= 1)
            {
                СountComment--;
                return;
            }
            RatingUser = (RatingUser * СountComment - comment.Rating) / (СountComment - 1);
            WeightGameUser = (WeightGameUser * СountComment - comment.WeightGame) / (СountComment - 1);
            AgePlayerUser = (AgePlayerUser * СountComment - comment.AgePlayer) / (СountComment - 1);
            GameTimeUser = (GameTimeUser * СountComment - comment.GameTime) / (СountComment - 1);
            BestRangeOfPlayersMaxUser = (BestRangeOfPlayersMaxUser * СountComment - comment.BestPlayerMax) / (СountComment - 1);
            BestRangeOfPlayersMinUser = (BestRangeOfPlayersMinUser * СountComment - comment.BestPlayerMin) / (СountComment - 1);
            СountComment--;
        }

        public void RoundUserRating() 
        {
            AgePlayerUser = Math.Round(AgePlayerUser);
            GameTimeUser = Math.Round(GameTimeUser);
            BestRangeOfPlayersMaxUser = Math.Round(BestRangeOfPlayersMaxUser);
            BestRangeOfPlayersMinUser = Math.Round(BestRangeOfPlayersMinUser);
            WeightGameUser = Math.Round(WeightGameUser, 2);
            RatingUser = Math.Round(RatingUser, 3);
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
        public IFormFile rule { get; set; }
        public IFormFile avatarGame { get; set; }
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
        public IFormFile? rule { get; set; }
        public IFormFile? avatarGame { get; set; }
    }
}
