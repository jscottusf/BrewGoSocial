using System.Collections.Generic;

namespace BrewGoSocial.Models.Users
{
    public class UserModel : BaseEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Slug { get; set; }
        public string Email { get; set; }
        public Profile Profile { get; set; }
        public virtual List<Post> Posts { get; set; }
        public virtual List<SavedBrewery> SavedBreweries { get; set; }
        public virtual List<Follow> Follows { get; set; }
        public virtual List<Notification> Notifcations { get; set; }
    }
}
