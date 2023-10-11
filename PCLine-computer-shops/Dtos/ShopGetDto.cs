using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Models;
using System.Text.Json.Serialization;

namespace PCLine_computer_shops.Dtos
{
    public class ShopGetDto
    {
        public int ShopId { get; set; }
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public Country Country { get; set; }
    }
}
