using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Extensions;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IShopRepository
    {
        Task<ICollection<Shop>> GetAllShopsAsync(int pageNumber, int pageSize, string searchTerm, List<Country> enumCountry);
        Task<ICollection<Shop>> GetAllShopsForProductAsync();
        Task<Shop> CreateShopAsync(Shop shop);
        Task<Shop> GetShopByIdAsync(int shopId);
        Task<Shop> UpdateShopAsync(Shop updateShop);
        Task<Shop> DeleteShopAsync(int shopId);
    }
}
