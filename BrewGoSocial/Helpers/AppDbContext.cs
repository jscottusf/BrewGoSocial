using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using BrewGoSocial.Entities;
using BrewGoSocial.Models;
using BrewGoSocial.Models.Users;

namespace BrewGoSocial.Helpers
{
    public class BrewGoDbContext : DbContext
    {
        public BrewGoDbContext(DbContextOptions<BrewGoDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<SavedBrewery> SavedBreweries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasMany(l => l.SavedBreweries);
        }
    }
}
