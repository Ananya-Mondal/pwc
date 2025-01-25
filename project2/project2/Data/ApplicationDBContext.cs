using Microsoft.EntityFrameworkCore;
using project2.Models;

namespace project2.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<product> Products { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
