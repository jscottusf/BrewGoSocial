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

        [HttpGet]
        public ActionResult<IEnumerable<Post>> GetAll()
        {
            var posts = _service.GetAll();
            posts = posts.Reverse();
            return Ok(posts);
        }

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
                return BadRequest(new { message = ex.Message });
            }
        }

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

        // api/posts/SearchPosts?query={postBody content or users or whatever}
        [HttpGet("[action]")]
        public IActionResult SearchPosts([FromQuery] string query)
        {
            var results = _service.SearchPosts(query);
            return Ok(results);
        }
    }
}
