using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PCLine_computer_shops.Models;
using System.Formats.Tar;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace PCLine_computer_shops.Data
{
    public class DataContext : IdentityDbContext<IdentityUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
            public DbSet<Shop> Shops { get; set; }
            public DbSet<Product> Products { get; set; }
            public DbSet<Employee> Employees { get; set; }  
            public DbSet<Address> Address { get; set; }
            public DbSet<AppUser> Users { get; set; }
            public DbSet<TaskEmployee> TaskEmployees { get; set; }
            public DbSet<TaskFile> TaskFiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Product>()
                 .HasOne(h => h.Shop)
                 .WithMany(h => h.Products)
                 .HasForeignKey(h => h.ShopId)
                 .IsRequired();

            modelBuilder.Entity<Employee>()
                .HasOne(h => h.Shop)
                .WithMany(h => h.Employees)
                .HasForeignKey(h => h.ShopId)
                .IsRequired();

            modelBuilder.Entity<Shop>()
                .HasOne(h => h.Address)
                .WithOne(h => h.Shop)
                .HasForeignKey<Address>(h => h.AddressId);

            modelBuilder.Entity<TaskEmployee>()
                .HasMany(h => h.TaskFiles)
                .WithOne(h => h.TaskEmployee)
                .HasForeignKey(h => h.TaskId)
                .IsRequired();

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Name = "User",
                    NormalizedName = "USER"
                },
            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);

            base.OnModelCreating(modelBuilder);
        }
    }
}
