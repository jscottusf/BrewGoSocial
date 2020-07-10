using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models.Users;

namespace BrewGoSocial.Models
{
    public class SavedBrewery
    {
        [Key]
        public int BreweryId { get; set; }
        public string BreweryName { get; set; }
        public string BreweryType { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zip { get; set; }
        public string Phone { get; set; }
        public string Url { get; set; }
        public int Rating { get; set; }
        public int apiId { get; set; }
        [ForeignKey("RelationalUserModel")]
        public int UserId { get; set; }
    }
}
