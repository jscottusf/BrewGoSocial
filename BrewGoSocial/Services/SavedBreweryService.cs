using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using BrewGoSocial.Entities;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BrewGoSocial.Services
{
    public interface ISavedBreweryService
    {
        bool SaveChanges();
        IEnumerable<SavedBrewery> GetAll();
        SavedBrewery GetBreweryById(int id);
        void Create(SavedBrewery brewery);
        void Update(SavedBrewery brewery);
        void Delete(SavedBrewery brewery);
    }

    public class SavedBreweryService : ISavedBreweryService
    {
        private readonly BrewGoDbContext _context;

        public SavedBreweryService(BrewGoDbContext context)
        {
            _context = context;
        }

        public void Create(SavedBrewery brewery)
        {
            if (brewery == null)
            {
                throw new ArgumentNullException(nameof(brewery));
            }
            _context.SavedBreweries.Add(brewery);
        }

        public void Delete(SavedBrewery brewery)
        {
            if (brewery == null)
            {
                throw new NotImplementedException(nameof(brewery));
            }
            _context.SavedBreweries.Remove(brewery);
        }

        public IEnumerable<SavedBrewery> GetAll()
        {
            return _context.SavedBreweries.ToList();
        }

        public SavedBrewery GetBreweryById(int id)
        {
            return _context.SavedBreweries.FirstOrDefault(b => b.BreweryId == id);
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        public void Update(SavedBrewery brewery)
        {
            _context.SavedBreweries.Update(brewery);
        }
    }
}
