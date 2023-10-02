﻿namespace PCLine_computer_shops.Models
{
    public class Shop
    {
        public int ShopId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public string Location { get; set; }
        public ICollection<Product> Products { get; set; } = new List<Product>();
        //public ICollection<Review> Reviews { get; set; }
        //public ICollection<Employee> Employees { get; set; }
    }
}
