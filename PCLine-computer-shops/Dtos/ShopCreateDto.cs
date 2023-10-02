using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Dtos
{
    public class ShopCreateDto
    {
        public string Name { get; set; }
        public DateTime StartDate { get; set; }
        public string Location { get; set; }
    }
}
