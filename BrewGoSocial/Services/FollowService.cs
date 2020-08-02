using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;

namespace BrewGoSocial.Services
{
    public interface IFollowService
    {
        bool SaveChanges();
        IEnumerable<Follow> GetAll();
        Follow GetFollowById(int id);
        void Create(Follow follow);
        void Update(Follow follow);
        void Delete(Follow follow);
    }

    public class FollowService : IFollowService
    {
        private readonly BrewGoDbContext _context;

        public FollowService(BrewGoDbContext context)
        {
            _context = context;
        }

        public void Create(Follow follow)
        {
            if (follow == null)
            {
                throw new ArgumentNullException(nameof(follow));
            }

            var notification = new Notification
            {
                FirstName = follow.FirstName,
                LastName = follow.LastName,
                Username = follow.Username,
                Slug = follow.Slug,
                NotificationType = "followed you",
                LikerId = follow.UserId,
                UserId = follow.FollowUserId,
            };
            _context.Notifications.Add(notification);
            _context.Follows.Add(follow);
        }

        public void Delete(Follow follow)
        {
            if (follow == null)
            {
                throw new NotImplementedException(nameof(follow));
            }
            var notification = _context.Notifications.FirstOrDefault(n => n.LikerId == follow.UserId && n.NotificationType == "followed you");
            if (notification == null)
            {
                throw new NotImplementedException(nameof(notification));
            }
            _context.Notifications.Remove(notification);
            _context.Follows.Remove(follow);
        }

        public IEnumerable<Follow> GetAll()
        {
            return _context.Follows.ToList();
        }

        public Follow GetFollowById(int id)
        {
            return _context.Follows.FirstOrDefault(b => b.FollowId == id);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void Update(Follow follow)
        {
            _context.Follows.Update(follow);
        }
    }
}
