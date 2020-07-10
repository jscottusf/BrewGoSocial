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
    //api routes for Saved Breweries
    [Authorize]
    [ApiController]
    [Route("api/breweries")]
    public class SavedBreweriesController : Controller
    {
        private readonly ISavedBreweryService _service;

        public SavedBreweriesController(ISavedBreweryService service)
        {
            _service = service;
        }

        //GET api/breweries
        [HttpGet]
        public ActionResult<IEnumerable<SavedBrewery>> GetAll()
        {
            var breweries = _service.GetAll();
            return Ok(breweries);
        }

        //GET api/breweries/:id
        [HttpGet("{id}", Name="GetBreweryById")]
        public ActionResult<SavedBrewery> GetBreweryById(int id)
        {
            var brewery = _service.GetBreweryById(id);
            return Ok(brewery);
        }

        //Post api/breweries
        [HttpPost]
        public ActionResult<SavedBrewery> Create(SavedBrewery brewery)
        {
            try
            {
                _service.Create(brewery);
                _service.SaveChanges();

                return CreatedAtRoute(nameof(GetBreweryById), new { Id = brewery.BreweryId }, brewery);
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, SavedBrewery brewery)
        {
            var breweryModel = _service.GetBreweryById(id);
            if (breweryModel == null)
            {
                return NotFound();
            }
            brewery.BreweryId = breweryModel.BreweryId;
            _service.Delete(breweryModel);
            _service.Update(brewery);
            _service.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var breweryModel = _service.GetBreweryById(id);
            if(breweryModel == null)
            {
                return NotFound();
            }
            _service.Delete(breweryModel);
            _service.SaveChanges();
            return NoContent();
        }

    }
}
