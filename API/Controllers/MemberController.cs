using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MemberController(IMemberRepository memberRepository, AppDbContext dbContext) : ControllerBase
    {

        [HttpGet]
        // [Authorize]
        public async Task<ActionResult<IReadOnlyList<Member>>> GetUsers()
        {
            return Ok(await memberRepository.GetMembersAsync());
        }

        // [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Member>> GetUsersById(string id)
        {
            var user = await memberRepository.GetMemberByIdAsync(id);
            
            if(user == null)
            {
                return NotFound();
            }
            return user;
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

        [HttpGet("{memberId}/photos")]
        // [Authorize]
        public async Task<ActionResult<Photo>> GetPhotos(string memberId)
        {
            return Ok(await memberRepository.GetPhotosForMemberAsync(memberId));
        }


        

        
        
    }
}
