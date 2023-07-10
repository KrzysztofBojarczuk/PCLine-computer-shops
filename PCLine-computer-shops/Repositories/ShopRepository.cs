using Microsoft.EntityFrameworkCore;
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

        public async Task<ICollection<Shop>> GetAllShops(string searchString)
        {
            var query = await _context.Shops.ToListAsync();

            if (!String.IsNullOrEmpty(searchString))
            {
                query = query.Where(x => x.Name.Contains(searchString)).ToList();
            }

            return query;
        }

        public async Task<Shop> GetShopById(int id)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(h => h.Id == id);

            if (shop == null)
            {
                return null;
            }

            return shop;
        }

        public Task<Shop> UpdateShop(Shop updateShop)
        {
            throw new NotImplementedException();
        }
    }
}
