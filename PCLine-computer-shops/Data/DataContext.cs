using Microsoft.EntityFrameworkCore;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Data
{
    public class DataContext : DbContext
    {
            public DataContext(DbContextOptions options) : base(options)
            {
            }
            public DbSet<Shop> Shops { get; set; }
            public DbSet<Product> Products { get; set; }
            public DbSet<Employee> Employees { get; set; }  
            public DbSet<Address> Address { get; set; }
            public DbSet<User> Users { get; set; }
            public DbSet<TaskEmployee> TaskEmployees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", Password = "admin" }
                );

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
                .HasOne(h => h.Employee)
                .WithOne(h => h.TaskEmployee)
                .HasForeignKey<TaskEmployee>(h => h.TaskEmployeeId);

            modelBuilder.Entity<TaskEmployee>()
                .HasOne(te => te.Shop)
                .WithOne(h => h.TaskEmployee)
                .HasForeignKey<TaskEmployee>(h => h.TaskEmployeeId);
        }
    }
}
