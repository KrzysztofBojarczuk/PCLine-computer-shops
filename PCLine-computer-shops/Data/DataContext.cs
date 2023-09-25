using Microsoft.EntityFrameworkCore;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Data
{
    public class DataContext : DbContext
    {
            public DataContext(DbContextOptions options) : base(options)
            {
            }
            public DbSet<Product> Products { get; set; }      
            public DbSet<Shop> Shops { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                .HasOne(p => p.Shop)
                .WithMany(s => s.Products)
                .HasForeignKey(p => p.Id);
        }
    }
}
