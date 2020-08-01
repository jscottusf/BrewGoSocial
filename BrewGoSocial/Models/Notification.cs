using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using BrewGoSocial.Models.Users;
using BrewGoSocial.Entities;


namespace BrewGoSocial.Models
{
    public class Notification : UserBase
    {
        [Key]
        public int NotificationId { get; set; }
        public string NotificationType { get; set; }
        public int PostId { get; set; }
        public User User { get; set; }
    }
}
