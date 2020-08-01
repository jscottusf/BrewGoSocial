using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models.Users;
using BrewGoSocial.Entities;


namespace BrewGoSocial.Models
{
    public class Follower : UserBase
    {
        [Key]
        public int FollowId { get; set; }
        public int FollowerId { get; set; }
        public string FollowerName { get; set; }
        public string FollowerSlug { get; set; }
        public User User { get; set; }
    }
}
