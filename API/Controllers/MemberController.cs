using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
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

        [HttpPut]
        public async Task<ActionResult> UpdateMember(memberUpdateDTO memberUpdateDTO)
        {
            var memberId = User.GetMemberId();
            if(memberId == null) return BadRequest("MemberId not found in claims");

            var member = await memberRepository.GetMemberForUpdate(memberId);
            if(member == null) return BadRequest("Could not find the memebr");

            member.DisplayName = memberUpdateDTO.DisplayName ?? member.DisplayName;
            member.Description = memberUpdateDTO.Description ?? member.Description;
            member.City = memberUpdateDTO.City ?? member.City;
            member.Country = memberUpdateDTO.Country ?? member.Country;

            member.User.DisplayName = memberUpdateDTO.DisplayName ?? member.User.DisplayName;

            memberRepository.Update(member);
            if(await memberRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update member");
        }


        

        
        
    }
}
