using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using BrewGoSocial.Entities;

namespace BrewGoSocial.Helpers
{
    public class BrewGoDbContext : DbContext
    {
        public BrewGoDbContext(DbContextOptions<BrewGoDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
    }
}
