using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BrewGoSocial.Services
{
    public interface ILikeService
    {
        bool SaveChanges();
        IEnumerable<Like> GetAll();
        Like GetLikeById(int id);
        void Create(Like like);
        void Update(Like like);
        void Delete(Like like);
    }

    public class LikeService : ILikeService
    {
        private readonly BrewGoDbContext _context;

        public LikeService(BrewGoDbContext context)
        {
            _context = context;
        }

        public void Create(Like like)
        {
            if (like == null)
            {
                throw new ArgumentNullException(nameof(like));
            }
            _context.Likes.Add(like);
        }

        public void Delete(Like like)
        {
            if (like == null)
            {
                throw new NotImplementedException(nameof(like));
            }
            _context.Likes.Remove(like);
        }

        public IEnumerable<Like> GetAll()
        {
            return _context.Likes.ToList();
        }

        public Like GetLikeById(int id)
        {
            return _context.Likes.FirstOrDefault(b => b.LikeId == id);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void Update(Like like)
        {
            _context.Likes.Update(like);
        }
    }
}
