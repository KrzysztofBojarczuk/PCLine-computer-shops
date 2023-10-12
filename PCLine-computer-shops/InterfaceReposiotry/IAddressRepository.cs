using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IAddressRepository
    {
        Task<Address> CreateAddressToShop(int shopId, Address address);
        Task<Address> GetAddressForShopById(int shopId);
        Task<Address> DeleteAddressForShop(int shopId);
    }
}
