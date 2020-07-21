using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models.Users;
using BrewGoSocial.Entities;
using System.Collections.Generic;

namespace BrewGoSocial.Models
{
    public class Post : UserBase
    {
        [Key]
        public int PostId { get; set; }
        public string ProfileImgUrl { get; set; }
        public string PostBody { get; set; }
        public virtual List<Comment> Comments { get; set; }
        [ForeignKey("RelationalUserModel")]
        public int UserId { get; set; }
    }
}
