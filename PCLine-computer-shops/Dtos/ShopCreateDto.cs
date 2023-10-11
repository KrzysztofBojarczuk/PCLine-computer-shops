using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Dtos
{
    public class ShopCreateDto
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public Country Country { get; set; }
    }
}
