using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BrewGoSocial.Services
{
    public interface IPostService
    {
        bool SaveChanges();
        IEnumerable<Post> GetAll();
        Post GetPostById(int id);
        Post GetById(int id);
        void Create(Post post);
        void Update(Post post);
        void Delete(Post post);
        IEnumerable<Post> SearchPosts(string query);
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
            return _context.Posts.Include(x => x.Comments).ToList();
        }

        //include comments for data in the client app
        public Post GetPostById(int id)
        {
            return _context.Posts.Include(x => x.Comments).Include(x => x.Likes).FirstOrDefault(b => b.PostId == id);
        }

        //does not include comments, so that they are not deleted
        public Post GetById(int id)
        {
            return _context.Posts.FirstOrDefault(b => b.PostId == id);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void Update(Post post)
        {
            //_context.Posts.Update(post);
        }

        // api/posts/SearchPosts?query={firstName}%20{lastName} or username
        public IEnumerable<Post> SearchPosts(string query)
        {
            return _context.Posts.Include(x => x.Comments).Where(x => x.PostBody.Contains(query) || (x.FirstName + " " + x.LastName).Contains(query) || x.Username.Contains(query));
        }
    }
}


