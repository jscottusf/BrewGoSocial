using System;
namespace BrewGoSocial.Models.Users
{
    public class UserBase : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Slug { get; set; }
    }
}
