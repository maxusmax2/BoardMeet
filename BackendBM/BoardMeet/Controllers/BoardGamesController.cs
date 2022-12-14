﻿using BoardMeet.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<IActionResult> PutBoardGame(int id, BoardGame boardGame)
        {
            if (id != boardGame.Id)
            {
                return BadRequest();
            }

            _context.Entry(boardGame).State = EntityState.Modified;

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
        public async Task<ActionResult<BoardGame>> PostBoardGame(IFormFile rule, IFormFile avatarGame, BoardGameCreateDto boardGameData)
        {

            
            string filetypeImage;
           
            if (avatarGame.ContentType != null)
            {
                if (avatarGame.ContentType[0..6] == "image/")
                {
                    filetypeImage = "." + avatarGame.ContentType[6..avatarGame.ContentType.Length];
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

            string filetypeRule;
            if (rule.ContentType != null)
            {
                if (!(avatarGame.ContentType[0..15] == "application/pdf"))
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
            string gameRoolPath;
            string avatarPath;
            if (avatarGame.Length > 0 && rule.Length > 0)
            {
                string imagePath = Path.Combine(_appEnvironment.WebRootPath + "/static/BoardGame/images", imageNameUnique);
                string rulePath = Path.Combine(_appEnvironment.WebRootPath + "/static/BoardGame/rule", ruleNameUnique);
                using (Stream fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await rule.CopyToAsync(fileStream);
                }
                using (Stream fileStream = new FileStream(rulePath, FileMode.Create))
                {
                    await rule.CopyToAsync(fileStream);
                }

                gameRoolPath = "static/BoardGame/rule/" + ruleNameUnique;
                avatarPath = "static/BoardGame/images/" + imageNameUnique;
            }
            else
            {
                return BadRequest("Файл пуст");
            }


            BoardGame boardGame = new BoardGame
            {
                Name = boardGameData.Name,
                RangeOfPlayersMax = boardGameData.RangeOfPlayersMax,
                RangeOfPlayersMin = boardGameData.RangeOfPlayersMin,
                GameTime = boardGameData.GameTime,
                BestRangeOfPlayersMaxUser = 0,
                BestRangeOfPlayersMinUser = 0,
                GameTimeUser = 0,
                RatingUser = 0,
                Description = boardGameData.Description,
                WeightGameUser = 0,
                AgePlayer = boardGameData.AgePlayer,
                AgePlayerUser = 0,
                GameRool = gameRoolPath,
                GameAvatar = avatarPath,
                AuthorId = boardGameData.AuthorId,
                СountComment = 0
            };


            _context.BoardGames.Add(boardGame);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBoardGame", new { id = boardGame.Id }, boardGame);
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
        public async Task<ActionResult<Comment>> PostComment(int id, Comment comment)
        {
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
        private void AddRaitingData(Comment comment)
        {
            BoardGame commentGame = comment.Game;
            commentGame.RatingUser = (commentGame.RatingUser * commentGame.СountComment + comment.Rating) / (commentGame.СountComment + 1);
            commentGame.WeightGameUser = (commentGame.WeightGameUser * commentGame.СountComment + comment.WeightGame) / (commentGame.СountComment + 1);
            commentGame.AgePlayerUser = (commentGame.AgePlayerUser * commentGame.СountComment + comment.AgePlayer) / (commentGame.СountComment + 1);
            commentGame.GameTimeUser = (commentGame.GameTimeUser * commentGame.СountComment + comment.GameTime) / (commentGame.СountComment + 1);
            commentGame.BestRangeOfPlayersMaxUser = (commentGame.BestRangeOfPlayersMaxUser * commentGame.СountComment + commentGame.RangeOfPlayersMax) / (commentGame.СountComment + 1);
            commentGame.BestRangeOfPlayersMinUser = (commentGame.BestRangeOfPlayersMinUser * commentGame.СountComment + commentGame.RangeOfPlayersMin) / (commentGame.СountComment + 1);
            commentGame.СountComment++;
        }

        private void RemoveRaitingData(Comment comment)
        {
            BoardGame commentGame = comment.Game;
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
