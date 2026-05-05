using E_Nots_API.Data;
using E_Nots_API.Model;
using Microsoft.AspNetCore.Mvc;

namespace E_Nots_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotsController : Controller
    {
        private readonly NotsData _notsData;

        public NotsController(NotsData notsData)
        {
            _notsData = notsData;
        }

        [HttpGet]
        public IActionResult GetNots()
        {
            var get_nots = _notsData.SelectAll();
            return Ok(get_nots);
        }

        [HttpGet("{id}")]
        public IActionResult GetNotsByID(int id)
        {
            var getbyid = _notsData.SelectByID(id);
            if (getbyid == null)
            {
                return NotFound();
            }
            return Ok(getbyid);
        }

        [HttpPost]
        public IActionResult InsertStudent([FromBody] NotsModel nots)
        {
            if (nots == null)
            {
                return BadRequest("Invalid Data");
            }

            if (!_notsData.InsertNots(nots))
            {
                return StatusCode(200, "Nots Inserted Sucessfully.");
            }
            return CreatedAtAction(nameof(GetNotsByID), new { id = nots.Id }, nots);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateNots([FromBody] NotsModel nots)
        {
            if (nots == null)
            {
                return BadRequest("invalid data");
            }

            if (_notsData.UpdateNots(nots))
            {
                return StatusCode(200, "Nots Updated Sucessfully.");
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNots(int id)
        {
            if (!_notsData.DeleteNots(id))
            {
                return Ok();
            }
            return NoContent();
        }
    }
}
