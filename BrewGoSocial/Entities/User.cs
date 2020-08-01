using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models;

namespace BrewGoSocial.Entities
{
    public class User : BaseEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Slug { get; set; }
        public string Email { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public virtual List<SavedBrewery> SavedBreweries { get; set; }
        public virtual List<Post> Posts { get; set; }
        public virtual List<Follower> Followers { get; set; }
        public virtual List<Notifcation> Notifcations { get; set; }
        public Profile Profile { get; set; }
    }
}
