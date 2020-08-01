using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models.Users;
using BrewGoSocial.Entities;


namespace BrewGoSocial.Models
{
    public class Follow : UserBase
    {
        [Key]
        public int FollowId { get; set; }
        public int FollowUserId { get; set; }
        public string FollowName { get; set; }
        public string FollowSlug { get; set; }
        public User User { get; set; }
    }
}
