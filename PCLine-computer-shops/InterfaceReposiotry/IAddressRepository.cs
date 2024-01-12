using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IAddressRepository
    {
        Task<Address> CreateAddressToShopAsync(int shopId, Address address);
        Task<Address> GetAddressForShopByIdAsync(int shopId);
        Task<Address> DeleteAddressForShopAsync(int shopId);
    }
}
