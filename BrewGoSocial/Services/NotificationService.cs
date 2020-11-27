using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BrewGoSocial.Services
{
    public interface INotificationService
    {
        bool SaveChanges();
        IEnumerable<Notification> GetAllById(int id);
        Notification GetNotificationById(int id);
        void Create(Notification notification);
        void Update(Notification notification);
        void Delete(Notification notification);
    }

    public class NotificationService : INotificationService
    {
        private readonly BrewGoDbContext _context;

        public NotificationService(BrewGoDbContext context)
        {
            _context = context;
        }

        public void Create(Notification notification)
        {
            if (notification == null)
            {
                throw new ArgumentNullException(nameof(notification));
            }
            _context.Notifications.Add(notification);
        }

        public void Delete(Notification notification)
        {
            if (notification == null)
            {
                throw new NotImplementedException(nameof(notification));
            }
            _context.Notifications.Remove(notification);
        }

        public IEnumerable<Notification> GetAllById(int id)
        {
            return _context.Notifications.Where(x => x.UserId == id);
        }

        public Notification GetNotificationById(int id)
        {
            return _context.Notifications.FirstOrDefault(b => b.NotificationId == id);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void Update(Notification notification)
        {
            _context.Notifications.Update(notification);
        }
    }
}
