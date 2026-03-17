using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController(AppDbContext dbContext) : ControllerBase
    {

        [HttpGet]
        public async Task<ActionResult<List<AppUser>>> GetUsers()
        {
            var users = await dbContext.Users.ToListAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<List<AppUser>>> GetUsersById(string id)
        {
            var user = await dbContext.Users.FindAsync(id);
            
            if(user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPost]
        public async Task<ActionResult<AppUser>> CreateUser(AppUser user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dbContext.Users.Add(user);
            await dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetUsersById), new { id = user.Id }, user);
        }


        

        
        
    }
}
