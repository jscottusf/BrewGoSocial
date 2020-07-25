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
    [Route("api/comments")]
    public class CommentsController : Controller
    {
        private readonly ICommentService _service;

        public CommentsController(ICommentService service)
        {
            _service = service;
        }

        //GET api/comments
        [HttpGet]
        public ActionResult<IEnumerable<Comment>> GetAll()
        {
            var comments = _service.GetAll();
            comments = comments.Reverse();
            return Ok(comments);
        }

        //GET api/comments/:id
        [HttpGet("{id}", Name = "GetCommentById")]
        public ActionResult<Comment> GetCommentById(int id)
        {
            var comment = _service.GetCommentById(id);
            if (comment == null)
            {
                return NotFound();
            }
            return Ok(comment);
        }

        //Post api/comments
        [HttpPost]
        public ActionResult<Comment> Create(Comment comment)
        {
            try
            {
                _service.Create(comment);
                _service.SaveChanges();

                return CreatedAtRoute(nameof(GetCommentById), new { Id = comment.CommentId }, comment);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        //put api/comments
        [HttpPut("{id}")]
        public ActionResult Update(int id, Comment comment)
        {
            var commentModel = _service.GetCommentById(id);
            if (commentModel == null)
            {
                return NotFound();
            }
            commentModel.CommentBody = comment.CommentBody;
            _service.SaveChanges();
            return NoContent();
        }

        //delete comment by id
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var commentModel = _service.GetCommentById(id);
            if (commentModel == null)
            {
                return NotFound();
            }
            _service.Delete(commentModel);
            _service.SaveChanges();
            return NoContent();
        }
    }
}
