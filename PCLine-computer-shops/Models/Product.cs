namespace PCLine_computer_shops.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        public required bool IsAvailable { get; set; }
        public List<OrderProduct> OrderProducts { get; set; }
    }
}
