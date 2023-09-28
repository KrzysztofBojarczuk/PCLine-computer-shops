using System.ComponentModel.DataAnnotations.Schema;

namespace PCLine_computer_shops.Models
{
    public class Product
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        [ForeignKey("ShopId")]
        public int ShopId { get; set; }
        public Shop Shop { get; set; } = null;
    }
}
