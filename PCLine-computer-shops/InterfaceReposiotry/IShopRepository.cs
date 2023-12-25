using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Extensions;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IShopRepository
    {
        Task<ICollection<Shop>> GetAllShops(int pageNumber, int pageSize, string searchTerm, List<Country> enumCountry);
        Task<ICollection<Shop>> GetAllShopsForProduct();
        Task<Shop> CreateShop(Shop shop);
        Task<Shop> GetShopById(int shopId);
        Task<Shop> UpdateShop(Shop updateShop);
        Task<Shop> DeleteShop(int shopId);
    }
}
