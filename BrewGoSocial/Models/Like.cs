﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models.Users;
using BrewGoSocial.Entities;

namespace BrewGoSocial.Models
{
    public class Like : BaseEntity
    {
        public int LikeId { get; set; }
        public int PostId { get; set; }
        public int CommentId { get; set; }
        public Post Post { get; set; }
        public Comment Comment { get; set; }
    }
}
