using System;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Entities.AppUser> Users { get; set; }
    public DbSet<Entities.Member> Members {get;set;}
    public DbSet<Entities.Photo> Photos {get;set;}
    
}
