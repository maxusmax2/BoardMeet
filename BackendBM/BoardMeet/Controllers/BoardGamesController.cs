using BoardMeet.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;
using System.Security.Claims;

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
            List<BoardGame> boardGames = await _context.BoardGames
                .Include(bg => bg.Author)
                .ToListAsync();
            foreach (BoardGame bg in boardGames)
            {
                bg.RoundUserRating();
            }
            return boardGames;
        }

        // GET: api/BoardGames/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BoardGame>> GetBoardGame(int id)
        {
            var boardGame = await _context.BoardGames
                .Include(bg => bg.Comments)
                .ThenInclude(bg => bg.Author)
                .Include(bg => bg.Author)
                .FirstOrDefaultAsync(bg => bg.Id == id);

            if (boardGame == null)
            {
                return NotFound();
            }
            boardGame.RoundUserRating();
            return boardGame;
        }

        // PUT: api/BoardGames/5
        [HttpPut("{id}")]
        [Authorize(Roles = "publisher")]
        public async Task<IActionResult> PutBoardGame(int id, [FromForm] BoardGameChangeDTO boardGame)
        {
            BoardGame boardGameChange = await _context.BoardGames.FirstAsync(x => x.Id == id);

            string? error = Utils.AccessVerification(boardGameChange.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }

            if (boardGameChange == null)
            {
                return BadRequest();
            }

            if (boardGame.avatarGame != null)
            {
                string filetypeImage;
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
                var imageNameUnique = System.Guid.NewGuid().ToString() + filetypeImage;
                if (boardGame.avatarGame.Length > 0)
                {
                    string imagePath = Path.Combine(_appEnvironment.WebRootPath + "/static/BoardGame/images", imageNameUnique);
                    using (Stream fileStream = new FileStream(imagePath, FileMode.Create))
                    {
                        await boardGame.avatarGame.CopyToAsync(fileStream);
                    }
                    boardGameChange.GameAvatar = "static/BoardGame/images/" + imageNameUnique;
                }
                else
                {
                    return BadRequest("Файл с картинкой пуст");
                }
            }

            if (boardGame.rule != null)
            {
                if (boardGame.rule.ContentType != null)
                {
                    if (!(boardGame.rule.ContentType[0..15] == "application/pdf"))
                    {
                        return BadRequest("Не PDF Файл");
                    }
                }
                else
                {
                    return BadRequest("Файл с правилами пуст");
                }
                var ruleNameUnique = System.Guid.NewGuid().ToString() + ".pdf";
                if (boardGame.rule.Length > 0)
                {
                    string rulePath = Path.Combine(_appEnvironment.WebRootPath + "/static/BoardGame/rule", ruleNameUnique);

                    using (Stream fileStream = new FileStream(rulePath, FileMode.Create))
                    {
                        await boardGame.rule.CopyToAsync(fileStream);
                    }
                    boardGameChange.Rule = "static/BoardGame/rule/" + ruleNameUnique; ;
                }
                else
                {
                    return BadRequest("Файл с правилами пуст");
                }
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
        [Authorize(Roles = "publisher")]
        public async Task<ActionResult<BoardGame>> PostBoardGame([FromForm] BoardGameCreateDTO boardGame)
        {
            string filetypeImage;

            string? error = Utils.AccessVerification(boardGame.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }

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

            string gameRulePath, avatarPath;

            if (boardGame.avatarGame.Length > 0 && boardGame.rule.Length > 0)
            {
                string imagePath = Path.Combine(_appEnvironment.WebRootPath + "/static/BoardGame/images", imageNameUnique);
                string rulePath = Path.Combine(_appEnvironment.WebRootPath + "/static/BoardGame/rule", ruleNameUnique);
                using (Stream fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await boardGame.avatarGame.CopyToAsync(fileStream);
                }
                using (Stream fileStream = new FileStream(rulePath, FileMode.Create))
                {
                    await boardGame.rule.CopyToAsync(fileStream);
                }

                gameRulePath = "static/BoardGame/rule/" + ruleNameUnique;
                avatarPath = "static/BoardGame/images/" + imageNameUnique;
            }
            else
            {
                return BadRequest("Файл пуст");
            }

            BoardGame boardGameCreate = new BoardGame(boardGame);

            boardGameCreate.GameAvatar = avatarPath;
            boardGameCreate.Rule = gameRulePath;

            _context.BoardGames.Add(boardGameCreate);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBoardGame", new { id = boardGameCreate.Id }, boardGameCreate);

        }


        [HttpDelete("{id}")]
        [Authorize(Roles = "publisher,admin")]
        public async Task<IActionResult> DeleteBoardGame(int id)
        {
            var boardGame = await _context.BoardGames.FindAsync(id);

            string? error = Utils.AccessVerification(boardGame.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
               return BadRequest(error);
            }

            _context.BoardGames.Remove(boardGame);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPost("CreateComment")]
        [Authorize(Roles = "player")]
        public async Task<ActionResult<Comment>> PostComment(CommentCreateDTO comment)
        {
           string? error = Utils.AccessVerification(comment.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }

            Comment commentCreate = new Comment(comment);
            _context.Comments.Add(commentCreate);
            await _context.SaveChangesAsync();

            BoardGame commentGame = await _context.BoardGames.FindAsync(comment.GameId);
            commentGame.AddRaitingData(commentCreate);
            await _context.SaveChangesAsync();

            return Ok(await _context.Comments
                .Where(x => x.Id == commentCreate.Id)
                .Include(c => c.Author)
                .FirstOrDefaultAsync());
        }
        [HttpGet("Comments/{id}")]
        public async Task<ActionResult<IEnumerable<BoardGame>>> GetComment(int id)
        {
            var bg = await _context.BoardGames
                .Where(x => x.Id == id)
                .Include(bg => bg.Comments)
                .ThenInclude(c => c.Author)
                .FirstOrDefaultAsync();
            if(bg == null ) 
            {
                return NotFound();
            }
            return Ok(bg.Comments);
        }

        [HttpDelete("DeleteComment/{id}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }
            string? error = Utils.AccessVerification(comment.AuthorId, HttpContext.User.Identity as ClaimsIdentity);
            if (error != null)
            {
                return BadRequest(error);
            }

            
            _context.Entry(comment).State = EntityState.Modified;
            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            BoardGame commentGame = await _context.BoardGames.FindAsync(comment.GameId);
            commentGame.RemoveRaitingData(comment);

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("Search/{searchval}")]
        [AllowAnonymous]
        public async Task<IActionResult> SearchBoardGames(string searchval)
        {
            List<BoardGame> searchBG = await _context.BoardGames
                .Where(bg => bg.Name.Contains(searchval))
                .Include(bg => bg.Author)
                .ToListAsync();

            return Ok(searchBG);
        }

        [HttpGet("Filter/{genre}")]
        [AllowAnonymous]
        public async Task<IActionResult> FilterBoardGames(string genre)
        {
            List<BoardGame> searchBG = await _context.BoardGames
                .Where(bg => bg.Genre.Contains(genre))
                .Include(bg => bg.Author)
                .ToListAsync();

            return Ok(searchBG);
        }
        [AllowAnonymous]
        [HttpGet("CreatedBoardGames/{id}")]
        public async Task<IActionResult> GetCreatedGames(int id)
        {
            var user = await _context.Users
                .Where(u => u.Id == id)
                .Include(u => u.CreateBoardGames)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user.CreateBoardGames);
        }

        private bool BoardGameExists(int id)
        {
            return _context.BoardGames.Any(e => e.Id == id);
        }

    }
}
