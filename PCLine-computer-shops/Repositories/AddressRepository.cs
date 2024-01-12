using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using PCLine_computer_shops.Data;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Repositories
{
    public class AddressRepository : IAddressRepository
    {
        private readonly DataContext _context;

        public AddressRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Address> GetAddressForShopByIdAsync(int shopId)
        {
            var shop = await _context.Shops
                          .Include(s => s.Address) 
                          .FirstOrDefaultAsync(h => h.ShopId == shopId);

            if (shop == null)
            {
                return null;
            }

            return shop.Address;
        }

        public async Task<Address> CreateAddressToShopAsync(int shopId, Address address)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(h => h.ShopId == shopId);

            if (shop == null)
            {
                return null; 
            }

            shop.Address = address;

            await _context.SaveChangesAsync();

            return address;
        }

        public async Task<Address> DeleteAddressForShopAsync(int shopId)
        {
            var shop = await _context.Shops.Include(h => h.Address).FirstOrDefaultAsync(s => s.ShopId == shopId);

            if (shop == null)
            {
                return null;
            }

            if (shop.Address == null)
            {
                return null;
            }

            var address = shop.Address;

            _context.Remove(address);
            await _context.SaveChangesAsync();

            return address;
        }
    }
}
