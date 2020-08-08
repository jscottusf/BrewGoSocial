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
    [Route("api/follows")]
    public class FollowsController : Controller
    {

        private readonly IFollowService _service;

        public FollowsController(IFollowService service)
        {
            _service = service;
        }

        //Post api/follows
        [HttpPost]
        public ActionResult<Follow> Create(Follow follow)
        {
            try
            {
                _service.Create(follow);
                _service.SaveChanges();

                return CreatedAtRoute(nameof(GetFollowById), new { Id = follow.FollowId }, follow);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //delete follow by id
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var followModel = _service.GetFollowById(id);
            if (followModel == null)
            {
                return NotFound();
            }
            _service.Delete(followModel);
            _service.SaveChanges();
            return NoContent();
        }
    }
}
