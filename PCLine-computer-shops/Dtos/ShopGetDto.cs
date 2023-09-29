using PCLine_computer_shops.Models;
using System.Text.Json.Serialization;

namespace PCLine_computer_shops.Dtos
{
    public class ShopGetDto
    {
        public int ShopId { get; set; }
        public string Name { get; set; }
        public DateTime StarthDate { get; set; }
        public string Location { get; set; }
    }
}
