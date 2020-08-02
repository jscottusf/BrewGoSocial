using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models.Users;

namespace BrewGoSocial.Models
{
    public class Comment : UserBase
    {
        [Key]
        public int CommentId { get; set; }
        public string ProfileImgUrl { get; set; }
        public string CommentBody { get; set; }
        public int UserId { get; set; }
        public int OriginalPosterId { get; set; }
        [ForeignKey("Post")]
        public int PostId { get; set; }
    }
}
