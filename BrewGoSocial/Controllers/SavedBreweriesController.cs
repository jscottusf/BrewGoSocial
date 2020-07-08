using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BrewGoSocial.Services;
using BrewGoSocial.Models;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace BrewGoSocial.Controllers
{
    //api routes for Saved Breweries
    [Route("api/breweries")]
    [ApiController]
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
            _service.Create(brewery);
            _service.SaveChanges();

            return CreatedAtRoute(nameof(GetBreweryById), new { Id = brewery.BreweryId }, brewery);
        }

        [HttpPut("{id}")]
        public ActionResult Update(int id, SavedBrewery brewery)
        {
            var breweryModel = _service.GetBreweryById(id);
            if (breweryModel == null)
            {
                return NotFound();
            }
            var updatedbrewery = new SavedBrewery
            {
                BreweryId = breweryModel.BreweryId,
                BreweryName = brewery.BreweryName,
                BreweryType = brewery.BreweryType,
                Street = brewery.Street,
                City = brewery.City,
                State = brewery.State,
                Zip = brewery.Zip,
                Phone = brewery.Phone,
                Url = brewery.Url,
                Rating = brewery.Rating,
                UserId = brewery.UserId
            };
            _service.Delete(breweryModel);
            _service.Update(updatedbrewery);
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
