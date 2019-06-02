using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Jinder.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Jinder.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class ValuesController : ControllerBase
    {
        private readonly DataDbContext _context;
        public ValuesController(DataDbContext context)
        {
            _context = context;

        }
        // GET api/values
    
        [Authorize]

        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
          var values = await _context.Values.ToListAsync();
          return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult GetValue(int id)
        {
            var value = _context.Values.FirstOrDefault( x => x.Id==id);
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
