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
            public DbSet<Address> Address { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Product>()
                 .HasOne(h => h.Shop)
                 .WithMany(h => h.Products)
                 .HasForeignKey(h => h.ShopId)
                 .IsRequired();

            modelBuilder.Entity<Shop>()
                .HasOne(h => h.Address)
                .WithOne(h => h.Shop)
                .HasForeignKey<Address>(h => h.AddressId);
        }
    }
}
