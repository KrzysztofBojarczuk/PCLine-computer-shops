using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IShopRepository
    {
        Task<ICollection<Shop>> GetAllShops(string searchString);
    }
}
