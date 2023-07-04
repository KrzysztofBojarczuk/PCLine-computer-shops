using PCLine_computer_shops.Data;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Repositories
{
    public class ShopRepository : IShopRepository
    {
        private readonly DataContext _context;

        public ShopRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<Shop> CreateShop(Shop shop)
        {
            _context.Shops.Add(shop);
            await _context.SaveChangesAsync();

            return shop;
        }

        public Task<Shop> DeleteShop(int id)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<Shop>> GetAllShops(string searchString)
        {
            throw new NotImplementedException();
        }

        public Task<Shop> GetShopById(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Shop> UpdateShop(Shop updateShop)
        {
            throw new NotImplementedException();
        }
    }
}
