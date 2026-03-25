using System;

namespace API.DTOs;

public class UserDTO
{
    public required string id { get; set; }
    public required string displayName { get; set; }
    public required string email { get; set; }
    public required string token { get; set; }
    public string? imageUrl { get; set; }
}
