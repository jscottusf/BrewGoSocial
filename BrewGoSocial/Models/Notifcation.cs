using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models.Users;
using BrewGoSocial.Entities;


namespace BrewGoSocial.Models
{
    public class Notifcation : UserBase
    {
        [Key]
        public int NotifcationId { get; set; }
        public string NotifcationType { get; set; }
        public int PostId { get; set; }
        public User User { get; set; }
    }
}
