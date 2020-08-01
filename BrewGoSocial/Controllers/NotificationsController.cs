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

        //Post api/notifications
        [HttpPost]
        public ActionResult<Notification> Create(Notification notification)
        {
            try
            {
                _service.Create(notification);
                _service.SaveChanges();

                return CreatedAtRoute(nameof(GetNotificationById), new { Id = notification.NotificationId }, notification);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //put api/notifications
        //[HttpPut("{id}")]
        //public ActionResult Update(int id, Notification notification)
        //{
        //    var notificationModel = _service.GetNotificationById(id);
        //    if (notificationModel == null)
        //    {
        //        return NotFound();
        //    }
        //    //changes here
        //    _service.SaveChanges();
        //    return NoContent();
        //}

        //delete notification by id

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var notificationModel = _service.GetNotificationById(id);
            if (notificationModel == null)
            {
                return NotFound();
            }
            _service.Delete(notificationModel);
            _service.SaveChanges();
            return NoContent();
        }
    }
}
