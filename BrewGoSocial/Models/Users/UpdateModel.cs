using System;
namespace BrewGoSocial.Models.Users
{
    public class UpdateModel : BaseEntity
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Slug { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
