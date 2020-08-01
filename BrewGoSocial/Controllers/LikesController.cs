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
    [Route("api/likes")]
    public class LikesController : Controller
    {
        private readonly ILikeService _service;

        public LikesController(ILikeService service)
        {
            _service = service;
        }

        //GET api/likes
        [HttpGet]
        public ActionResult<IEnumerable<Like>> GetAll()
        {
            var likes = _service.GetAll();
            return Ok(likes);
        }

        //GET api/likess/:id
        [HttpGet("{id}", Name = "GetLikeById")]
        public ActionResult<Like> GetLikeById(int id)
        {
            var like = _service.GetLikeById(id);
            if (like == null)
            {
                return NotFound();
            }
            return Ok(like);
        }

        //Post api/likes
        [HttpPost]
        public ActionResult<Like> Create(Like like)
        {
            try
            {
                _service.Create(like);
                _service.SaveChanges();

                return CreatedAtRoute(nameof(GetLikeById), new { Id = like.LikeId }, like);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //We are not editing likes. it's post and delete only.

        //put api/likes
        //[HttpPut("{id}")]
        //public ActionResult Update(int id, Like like)
        //{
        //    var likeModel = _service.GetLikeById(id);
        //    if (likeModel == null)
        //    {
        //        return NotFound();
        //    }
        //    //changes here
        //    _service.SaveChanges();
        //    return NoContent();
        //}

        //delete like by id
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var likeModel = _service.GetLikeById(id);
            if (likeModel == null)
            {
                return NotFound();
            }
            _service.Delete(likeModel);
            _service.SaveChanges();
            return NoContent();
        }
    }
}
