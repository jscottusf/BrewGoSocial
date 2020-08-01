using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;
using Microsoft.EntityFrameworkCore;

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
            _context.Follows.Add(follow);
        }

        public void Delete(Follow follow)
        {
            if (follow == null)
            {
                throw new NotImplementedException(nameof(follow));
            }
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
