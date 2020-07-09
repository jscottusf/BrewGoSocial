using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

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

            string breweryName = brewery.BreweryName;
            if (_context.SavedBreweries.Any(b => b.BreweryName == brewery.BreweryName))
            {
                throw new AppException(breweryName + " has already been added to your favorites list");
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
