using BoardMeet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using System;

namespace BoardMeet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BoardGamesController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly IWebHostEnvironment _appEnvironment;
        public BoardGamesController(ApplicationContext context, IWebHostEnvironment appEnvironment)
        {
            _context = context;
            _appEnvironment = appEnvironment;
        }

        // GET: api/BoardGames
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BoardGame>>> GetBoardGames()
        {
            return await _context.BoardGames.ToListAsync();
        }

        // GET: api/BoardGames/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardGame>> GetBoardGame(int id)
        {
            var boardGame = await _context.BoardGames
                .Include(bg => bg.Comments)
                .Include(bg => bg.Author)
                .FirstOrDefaultAsync(bg => bg.Id == id);

            if (boardGame == null)
            {
                return NotFound();
            }

            return boardGame;
        }

        // PUT: api/BoardGames/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBoardGame(int id, BoardGameChangeDTO boardGame)
        {
            BoardGame boardGameChange = await _context.BoardGames.FirstAsync(x => x.Id == id);
            if (boardGameChange == null)
            {
                return BadRequest();
            }
            boardGameChange.Change(boardGame);


            _context.Entry(boardGameChange).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BoardGameExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPost]
        public async Task<ActionResult<BoardGame>> PostBoardGame([FromForm] BoardGameCreateDTO boardGame)
        {
            string filetypeImage;
            BoardGame boardGameCreate = new BoardGame(boardGame);
            if (boardGame.avatarGame.ContentType != null)
            {
                if (boardGame.avatarGame.ContentType[0..6] == "image/")
                {
                    filetypeImage = "." + boardGame.avatarGame.ContentType[6..boardGame.avatarGame.ContentType.Length];
                }
                else
                {
                    return BadRequest("Файл не картинка");
                }
            }
            else
            {
                return BadRequest("Файл пуст");
            }

            if (boardGame.rule.ContentType != null)
            {
                if (!(boardGame.rule.ContentType[0..15] == "application/pdf"))
                {
                    return BadRequest("Не PDF Файл");
                }
            }
            else
            {
                return BadRequest("Файл пуст");
            }

            var imageNameUnique = System.Guid.NewGuid().ToString() + filetypeImage;
            var ruleNameUnique = System.Guid.NewGuid().ToString() + ".pdf";

            string gameRoolPath, avatarPath;

            if (boardGame.avatarGame.Length > 0 && boardGame.rule.Length > 0)
            {
                string imagePath = Path.Combine(_appEnvironment.WebRootPath + "/static/BoardGame/images", imageNameUnique);
                string rulePath = Path.Combine(_appEnvironment.WebRootPath + "/static/BoardGame/rule", ruleNameUnique);
                using (Stream fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await boardGame.rule.CopyToAsync(fileStream);
                }
                using (Stream fileStream = new FileStream(rulePath, FileMode.Create))
                {
                    await boardGame.rule.CopyToAsync(fileStream);
                }

                gameRoolPath = "static/BoardGame/rule/" + ruleNameUnique;
                avatarPath = "static/BoardGame/images/" + imageNameUnique;
            }
            else
            {
                return BadRequest("Файл пуст");
            }

            boardGameCreate.GameAvatar = avatarPath;
            boardGameCreate.GameRool = gameRoolPath;
           
            _context.BoardGames.Add(boardGameCreate);
            await _context.SaveChangesAsync();
            
            return CreatedAtAction("GetBoardGame", new { id = boardGameCreate.Id }, boardGameCreate);
            
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBoardGame(int id)
        {
            var boardGame = await _context.BoardGames.FindAsync(id);
            if (boardGame == null)
            {
                return NotFound();
            }

            _context.BoardGames.Remove(boardGame);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("CreateComment")]
        public async Task<ActionResult<Comment>> PostComment(CommentCreateDTO dto)
        {
            Comment comment = new Comment(dto);

            _context.Comments.Add(comment);

            AddRaitingData(comment);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("DeleteComment/{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            RemoveRaitingData(comment);
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("Search")]
        public async Task<IActionResult> SearchBG(string searchval)
        {
            List<BoardGame> searchBG = await _context.BoardGames
                .Where(bg => bg.Name.Contains(searchval))
                .ToListAsync();

            return Ok(searchBG);
        }
        private async void AddRaitingData(Comment comment)
        {
            BoardGame commentGame = await _context.BoardGames.FindAsync(comment.GameId);
            commentGame.RatingUser = (commentGame.RatingUser * commentGame.СountComment + comment.Rating) / (commentGame.СountComment + 1);
            commentGame.WeightGameUser = (commentGame.WeightGameUser * commentGame.СountComment + comment.WeightGame) / (commentGame.СountComment + 1);
            commentGame.AgePlayerUser = (commentGame.AgePlayerUser * commentGame.СountComment + comment.AgePlayer) / (commentGame.СountComment + 1);
            commentGame.GameTimeUser = (commentGame.GameTimeUser * commentGame.СountComment + comment.GameTime) / (commentGame.СountComment + 1);
            commentGame.BestRangeOfPlayersMaxUser = (commentGame.BestRangeOfPlayersMaxUser * commentGame.СountComment + commentGame.RangeOfPlayersMax) / (commentGame.СountComment + 1);
            commentGame.BestRangeOfPlayersMinUser = (commentGame.BestRangeOfPlayersMinUser * commentGame.СountComment + commentGame.RangeOfPlayersMin) / (commentGame.СountComment + 1);
            commentGame.СountComment++;
        }

        private async void RemoveRaitingData(Comment comment)
        {
            BoardGame commentGame = await _context.BoardGames.FindAsync(comment.GameId);
            if(commentGame.СountComment <= 1) 
            {
                commentGame.СountComment--;
                return;
            }
            commentGame.RatingUser = (commentGame.RatingUser * commentGame.СountComment - comment.Rating) / (commentGame.СountComment - 1);
            commentGame.WeightGameUser = (commentGame.WeightGameUser * commentGame.СountComment - comment.WeightGame) / (commentGame.СountComment - 1);
            commentGame.AgePlayerUser = (commentGame.AgePlayerUser * commentGame.СountComment - comment.AgePlayer) / (commentGame.СountComment - 1);
            commentGame.GameTimeUser = (commentGame.GameTimeUser * commentGame.СountComment - comment.GameTime) / (commentGame.СountComment - 1);
            commentGame.BestRangeOfPlayersMaxUser = (commentGame.BestRangeOfPlayersMaxUser * commentGame.СountComment - commentGame.RangeOfPlayersMax) / (commentGame.СountComment - 1);
            commentGame.BestRangeOfPlayersMinUser = (commentGame.BestRangeOfPlayersMinUser * commentGame.СountComment - commentGame.RangeOfPlayersMin) / (commentGame.СountComment - 1);
            commentGame.СountComment--;
        }
        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }

        private bool BoardGameExists(int id)
        {
            return _context.BoardGames.Any(e => e.Id == id);
        }

    }
}
