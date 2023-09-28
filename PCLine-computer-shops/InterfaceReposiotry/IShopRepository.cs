using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IShopRepository
    {
        Task<ICollection<Shop>> GetAllShops(string searchString);
        Task<Shop> CreateShop(Shop shop);
        Task<Shop> GetShopById(int shopId);
        Task<Shop> UpdateShop(Shop updateShop);
        Task<Shop> DeleteShop(int shopId);
    }
}
