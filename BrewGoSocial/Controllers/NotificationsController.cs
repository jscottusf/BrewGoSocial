using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrewGoSocial.Services;
using BrewGoSocial.Models;
using Microsoft.AspNetCore.JsonPatch;
using BrewGoSocial.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace BrewGoSocial.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/notifications")]
    public class NotificationsController : Controller
    {
        private readonly INotificationService _service;

        public NotificationsController(INotificationService service)
        {
            _service = service;
        }

        //GET api/notifications
        [HttpGet]
        public ActionResult<IEnumerable<Post>> GetAll()
        {
            var notifications = _service.GetAll();
            return Ok(notifications);
        }

        //GET api/notifications/:id
        [HttpGet("{id}", Name = "GetNotificationById")]
        public ActionResult<Notification> GetNotificationById(int id)
        {
            var notification = _service.GetNotificationById(id);
            if (notification == null)
            {
                return NotFound();
            }
            return Ok(notification);
        }
    }
}
