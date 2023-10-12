using PCLine_computer_shops.Enums;

namespace PCLine_computer_shops.Models
{
    public class Shop
    {
        public int ShopId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public Country Country { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
        public Address? Address { get; set; }
        //public ICollection<Review> Reviews { get; set; }
        //public ICollection<Employee> Employees { get; set; }
    }
}
