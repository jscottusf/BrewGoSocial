﻿using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;

namespace BrewGoSocial.Services
{
    public interface IPostService
    {
        bool SaveChanges();
        IEnumerable<Post> GetAll();
        Post GetPostById(int id);
        void Create(Post post);
        void Update(Post post);
        void Delete(Post post);
    }

    public class PostService : IPostService
    {
        private readonly BrewGoDbContext _context;

        public PostService(BrewGoDbContext context)
        {
            _context = context;
        }

        public void Create(Post post)
        {
            if (post == null)
            {
                throw new ArgumentNullException(nameof(post));
            }
            post.ProfileImgUrl = "../../assets/images/thumb.png";
            _context.Posts.Add(post);
        }

        public void Delete(Post post)
        {
            if (post == null)
            {
                throw new NotImplementedException(nameof(post));
            }
            _context.Posts.Remove(post);
        }

        public IEnumerable<Post> GetAll()
        {
            return _context.Posts.ToList();
        }

        public Post GetPostById(int id)
        {
            return _context.Posts.FirstOrDefault(b => b.PostId == id);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void Update(Post post)
        {
            _context.Posts.Update(post);
        }
    }
}


