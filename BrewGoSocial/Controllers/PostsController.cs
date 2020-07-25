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
    [Route("api/posts")]
    public class PostsController : Controller
    {
        private readonly IPostService _service;

        public PostsController(IPostService service)
        {
            _service = service;
        }

        //GET api/posts
        [HttpGet]
        public ActionResult<IEnumerable<Post>> GetAll()
        {
            var posts = _service.GetAll();
            posts = posts.Reverse();
            return Ok(posts);
        }

        //GET api/posts/:id
        [HttpGet("{id}", Name = "GetPostById")]
        public ActionResult<Post> GetPostById(int id)
        {
            var post = _service.GetPostById(id);
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        //Post api/posts
        [HttpPost]
        public ActionResult<Post> Create(Post post)
        {
            try
            {
                _service.Create(post);
                _service.SaveChanges();

                return CreatedAtRoute(nameof(GetPostById), new { Id = post.PostId }, post);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //put api/posts
        [HttpPut("{id}")]
        public ActionResult Update(int id, Post post)
        {
            var postModel = _service.GetPostById(id);
            if (postModel == null)
            {
                return NotFound();
            }
            postModel.PostBody = post.PostBody;
            _service.SaveChanges();
            return NoContent();
        }

        //delete post by id
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var postModel = _service.GetPostById(id);
            if (postModel == null)
            {
                return NotFound();
            }
            _service.Delete(postModel);
            _service.SaveChanges();
            return NoContent();
        }
    }
}
