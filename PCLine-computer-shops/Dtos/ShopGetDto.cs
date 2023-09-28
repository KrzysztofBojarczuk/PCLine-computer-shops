using PCLine_computer_shops.Models;

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
