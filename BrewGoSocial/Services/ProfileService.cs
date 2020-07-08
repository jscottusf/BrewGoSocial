using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;

namespace BrewGoSocial.Services
{
    public interface IProfileService
    {
        bool SaveChanges();
        IEnumerable<Profile> GetAll();
        Profile GetProfileById(int id);
        void Create(Profile profile);
        void Update(Profile profile);
        void Delete(Profile profile);
    }

    public class ProfileService : IProfileService
    {
        private readonly BrewGoDbContext _context;

        public ProfileService(BrewGoDbContext context)
        {
            _context = context;
        }

        public void Create(Profile profile)
        {
            if (profile == null)
            {
                throw new ArgumentNullException(nameof(profile));
            }
            _context.Profiles.Add(profile);
        }

        public void Delete(Profile profile)
        {
            if (profile == null)
            {
                throw new NotImplementedException(nameof(profile));
            }
            _context.Profiles.Remove(profile);
        }

        public IEnumerable<Profile> GetAll()
        {
            return _context.Profiles.ToList();
        }

        public Profile GetProfileById(int id)
        {
            return _context.Profiles.FirstOrDefault(b => b.ProfileId == id);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void Update(Profile profile)
        {
            _context.Profiles.Update(profile);
        }
    }
}

