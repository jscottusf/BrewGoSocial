using System;
using Microsoft.EntityFrameworkCore;
using BrewGoSocial.Entities;
using BrewGoSocial.Models;
using System.Linq;

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
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasMany(u => u.SavedBreweries);
            modelBuilder.Entity<User>().HasMany(u => u.Posts);
            modelBuilder.Entity<Post>().HasMany(p => p.Comments);
            modelBuilder.Entity<User>().HasOne(p => p.Profile);
        }

        public override int SaveChanges()
        {
            var entries = ChangeTracker
                .Entries()
                .Where(e => e.Entity is BaseEntity && (
                        e.State == EntityState.Added
                        || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                ((BaseEntity)entityEntry.Entity).UpdatedDate = DateTime.Now;

                if (entityEntry.State == EntityState.Added)
                {
                    ((BaseEntity)entityEntry.Entity).CreatedDate = DateTime.Now;
                }
            }

            return base.SaveChanges();
        }
    }
}
