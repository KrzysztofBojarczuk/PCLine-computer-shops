using PCLine_computer_shops.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PCLine_computer_shops.Models
{
    public class Shop
    {
        public int ShopId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public Country Country { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
        public ICollection<Employee> Employees { get; set; } = new List<Employee>();
        public Address? Address { get; set; }
    }
}
