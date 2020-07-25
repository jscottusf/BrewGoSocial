using System;
using System.Collections.Generic;
using System.Linq;
using BrewGoSocial.Entities;
using BrewGoSocial.Models;
using BrewGoSocial.Helpers;
using Microsoft.EntityFrameworkCore;

namespace BrewGoSocial.Services
{
    public interface IUserService
    {
        bool SaveChanges();
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User GetBySlug(string slug);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
        IEnumerable<Comment> GetCommentsByUserId(int id);
    }

    public class UserService : IUserService
    {
        private BrewGoDbContext _context;

        public UserService(BrewGoDbContext context)
        {
            _context = context;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Users.Include(x => x.Profile).SingleOrDefault(x => x.Username == username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _context.Users;
        }

        public User GetById(int id)
        {
            return _context.Users.Include(x => x.SavedBreweries).Include(x => x.Posts).ThenInclude(post => post.Comments).Include(x => x.Profile).FirstOrDefault(u => u.Id == id);
        }

        public User GetBySlug(string slug)
        {
            return _context.Users.Include(x => x.Posts).ThenInclude(post => post.Comments).Include(x => x.Profile).FirstOrDefault(u => u.Slug == slug);
        }

        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.Username == user.Username))
                throw new AppException("Username \"" + user.Username + "\" is already taken");

            if (_context.Users.Any(x => x.Email == user.Email))
                throw new AppException("Email Address \"" + user.Email + "\" is already registered");

            //make user slug (username but lower case only)
            user.Slug = user.Username.ToLower();

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);

            //create a mew blank profile for new user before saving changes
            user.Profile = new Profile
            {
                City = "",
                State = "",
                Occupation = "",
                FavoriteBreweries = "",
                FavoriteBeers = "",
                Bio = "",
                UserId = user.Id,
                CreatedDate = DateTime.Now,
                UpdatedDate = DateTime.Now,
                ProfileImgUrl = "../../assets/images/thumb.png"
            };

            _context.SaveChanges();

            return user;
        }

        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.Username) && userParam.Username != user.Username)
            {
                // throw error if the new username is already taken
                if (_context.Users.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + userParam.Username + " is already taken");

                user.Username = userParam.Username;
                user.Slug = userParam.Username.ToLower();
            }

            // update email if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.Email) && userParam.Email != user.Email)
            {
                // throw error if the new username is already taken
                if (_context.Users.Any(x => x.Email == userParam.Email))
                    throw new AppException("Email Address " + userParam.Email + " is already in use");

                user.Email = userParam.Email;
            }

            // update user properties if provided
            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Users.Find(id);
            if (user != null)
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

        // needed for updated user profile picture in all comments that they have made
        public IEnumerable<Comment> GetCommentsByUserId(int id)
        {
            return _context.Comments.Where(c => c.UserId == id);
        }
    }
}
