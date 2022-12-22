using BoardMeet.Models;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

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
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Meet>()
                .HasOne(p => p.Author)
                .WithMany(b => b.CreatedMeets);
            modelBuilder.Entity<Meet>()
               .HasMany(p => p.Players)
               .WithMany(b => b.JoinedMeets);
            
        }
    }
}
