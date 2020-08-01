﻿using System;
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
    [Route("api/followers")]
    public class FollowsController : Controller
    {

        private readonly IFollowService _service;

        public FollowsController(IFollowService service)
        {
            _service = service;
        }

        //GET api/follows
        [HttpGet]
        public ActionResult<IEnumerable<Follow>> GetAll()
        {
            var follows = _service.GetAll();
            return Ok(follows);
        }

        //GET api/follows/:id
        [HttpGet("{id}", Name = "GetFollowById")]
        public ActionResult<Follow> GetFollowById(int id)
        {
            var follow = _service.GetFollowById(id);
            if (follow == null)
            {
                return NotFound();
            }
            return Ok(follow);
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

        //put api/follows
        //[HttpPut("{id}")]
        //public ActionResult Update(int id, Follow follow)
        //{
        //    var postModel = _service.GetPostById(id);
        //    if (postModel == null)
        //    {
        //        return NotFound();
        //    }
        //    postModel.PostBody = post.PostBody;
        //    _service.SaveChanges();
        //    return NoContent();
        //}

        //delete post by id
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
