using BoardMeet.Models;
using Microsoft.EntityFrameworkCore;

namespace BoardMeet
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<BoardGame> BoardGames { get; set; }
        public DbSet<Meet> Meets { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            //Database.EnsureDeleted();//Не на релиз
            Database.EnsureCreated();

        }
    }
}
