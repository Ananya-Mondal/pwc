using Microsoft.EntityFrameworkCore;
using project2.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace project2.Data
{
    public class ApplicationDBContext : DbContext
    {
        public ApplicationDBContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<project2.Models.Cart> Cart { get; set; } = default!;
        public DbSet<project2.Models.Order> Order { get; set; } = default!;
        public DbSet<project2.Models.OrderDetails> OrderDetails { get; set; } = default!;

        public DbSet<OrderView> OrderView { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Explicitly include Product as an entity
            modelBuilder.Entity<OrderView>(g =>
            {
                g.HasNoKey();
                g.ToView("OrderView");
            });
        }

       
        
    }
}
