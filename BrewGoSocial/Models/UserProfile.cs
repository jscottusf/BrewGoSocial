using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BrewGoSocial.Models
{
    public class UserProfile
    {
        [Key]
        public int ProfileId { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Occupation { get; set; }
        public string FavoriteBreweries { get; set; }
        public string FavoriteBeers { get; set; }
        public string Bio { get; set; }
    }
}
