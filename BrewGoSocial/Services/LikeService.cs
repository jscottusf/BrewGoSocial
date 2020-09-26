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

            if (like.UserId != like.PosterId)
            {
                var user = _context.Users.FirstOrDefault(u => u.Id == like.UserId);

                var notification = new Notification
                {
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Username = user.Username,
                    Slug = user.Slug,
                    NotificationType = "liked",
                    UserId = like.PosterId,
                    PostId = like.PostId,
                    LikerId = like.UserId
                };

                _context.Notifications.Add(notification);
            }
            
            _context.Likes.Add(like);
        }

        public void Delete(Like like)
        {
            if (like == null)
            {
                throw new NotImplementedException(nameof(like));
            }
            var notification = _context.Notifications.FirstOrDefault(n => n.PostId == like.PostId && n.LikerId == like.UserId);

            if (notification != null)
            {
                _context.Notifications.Remove(notification);
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
