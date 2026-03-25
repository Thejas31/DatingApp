using System;
using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtentions
{
    public static UserDTO userDTOResponse(this AppUser user, ITokenService tokenService)
    {
        return new UserDTO
            {
                id = user.Id,
                displayName = user.DisplayName,
                email = user.Email,
                token = tokenService.CreateToken(user),
                imageUrl = user.ImageUrl
            };
    }

}
