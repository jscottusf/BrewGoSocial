﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models;

namespace BrewGoSocial.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Slug { get; set; }
        public string Email { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Occupation { get; set; }
        public string FavoriteBreweries { get; set; }
        public string FavoriteBeers { get; set; }
        public string Bio { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public virtual List<SavedBrewery> SavedBreweries { get; set; }
    }
}
