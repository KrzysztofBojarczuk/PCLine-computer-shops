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
    }
}
