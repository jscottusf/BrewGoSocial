using System.Collections.Generic;
using BrewGoSocial.Services;
using BrewGoSocial.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace BrewGoSocial.Controllers
{
    //api routes for All User Profiles
    [Authorize]
    [ApiController]
    [Route("api/profiles")]
    public class ProfilesController : Controller
    {
        private readonly IProfileService _service;

        public ProfilesController(IProfileService service)
        {
            _service = service;
        }

        //GET api/profiles
        [HttpGet]
        public ActionResult<IEnumerable<Profile>> GetAll()
        {
            var profiles = _service.GetAll();
            return Ok(profiles);
        }

        //GET api/profiles/:id
        [HttpGet("{id}", Name = "GetProfileById")]
        public ActionResult<Profile> GetProfileById(int id)
        {
            var profile = _service.GetProfileById(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }

        //Post api/profiles
        [HttpPost]
        public ActionResult<Profile> Create(Profile profile)
        {
            _service.Create(profile);
            _service.SaveChanges();

            return CreatedAtRoute(nameof(GetProfileById), new { Id = profile.ProfileId }, profile);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, Profile profile)
        {
            var profileModel = _service.GetProfileById(id);
            if (profileModel == null)
            {
                return NotFound();
            }
            profileModel.City = profile.City;
            profileModel.State = profile.State;
            profileModel.FavoriteBeers = profile.FavoriteBeers;
            profileModel.FavoriteBreweries = profile.FavoriteBreweries;
            profileModel.Occupation = profile.Occupation;
            profileModel.Bio = profile.Bio;
            _service.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var profileModel = _service.GetProfileById(id);
            if (profileModel == null)
            {
                return NotFound();
            }
            _service.Delete(profileModel);
            _service.SaveChanges();
            return NoContent();
        }
    }
}
