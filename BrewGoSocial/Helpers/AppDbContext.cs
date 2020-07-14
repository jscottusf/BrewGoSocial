using Microsoft.EntityFrameworkCore;
using BrewGoSocial.Entities;
using BrewGoSocial.Models;

namespace BrewGoSocial.Helpers
{
    public class BrewGoDbContext : DbContext
    {
        public BrewGoDbContext(DbContextOptions<BrewGoDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<SavedBrewery> SavedBreweries { get; set; }
        public DbSet<Profile> Profiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasMany(u => u.SavedBreweries);
            modelBuilder.Entity<User>().HasOne(p => p.Profile);
        }
    }
}
