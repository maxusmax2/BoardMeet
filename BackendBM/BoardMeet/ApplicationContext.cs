using BoardMeet.Models;
using Microsoft.EntityFrameworkCore;

namespace BoardMeet
{
    public class ApplicationContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<BoardGame> BoardGames { get; set; }
        public ApplicationContext()
        {
            //Database.EnsureDeleted();//Не на релиз!!!!!!!!!!!!!!!!!!!
            Database.EnsureCreated();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(
                "server=localhost;user=root;password=root;database=boardmeet;",
                new MySqlServerVersion(new Version(8, 0, 30))
            );
        }
    }
}
