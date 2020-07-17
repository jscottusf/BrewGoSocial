using System.ComponentModel.DataAnnotations;
using BrewGoSocial.Models.Users;

namespace BrewGoSocial.Models
{
    public class Post : UserBase
    {
        [Key]
        public int PostId { get; set; }
        public string PostBody { get; set; }
        public int UserId { get; set; }
    }
}
