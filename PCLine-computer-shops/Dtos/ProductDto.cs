using PCLine_computer_shops.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace PCLine_computer_shops.Dtos
{
    public class ProductGetDto
    {
        public int ProductId { get; set; }
        public string? Name { get; set; }
        public decimal Price { get; set; }
        public int Amount { get; set; }
        public int ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
