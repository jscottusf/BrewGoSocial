using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BrewGoSocial.Services
{
    public interface ICommentService
    {
        bool SaveChanges();
        IEnumerable<Comment> GetAll();
        Comment GetCommentById(int id);
        void Create(Comment comment);
        void Update(Comment comment);
        void Delete(Comment comment);
    }

    public class CommentService : ICommentService
    {
        private readonly BrewGoDbContext _context;

        public CommentService(BrewGoDbContext context)
        {
            _context = context;
        }

        public void Create(Comment comment)
        {
            if (comment == null)
            {
                throw new ArgumentNullException(nameof(comment));
            }
            comment.ProfileImgUrl = "../../assets/images/thumb.png";
            _context.Comments.Add(comment);
        }

        public void Delete(Comment comment)
        {
            if (comment == null)
            {
                throw new NotImplementedException(nameof(comment));
            }
            _context.Comments.Remove(comment);
        }

        public IEnumerable<Comment> GetAll()
        {
            return _context.Comments.ToList();
        }

        public Comment GetCommentById(int id)
        {
            return _context.Comments.FirstOrDefault(b => b.CommentId == id);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void Update(Comment comment)
        {
            _context.Comments.Update(comment);
        }
    }
}
