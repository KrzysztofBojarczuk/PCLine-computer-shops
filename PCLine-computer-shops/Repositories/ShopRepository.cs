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

        public async Task<ICollection<Shop>> GetAllShops(string searchTerm)
        {
            var query = await _context.Shops.Include(h => h.Products).ToListAsync();

            if (!String.IsNullOrEmpty(searchTerm))
            {
                query = query.Where(x => x.ShopId.ToString().Contains(searchTerm) || x.Name.ToLower().Contains(searchTerm)).ToList();
            }

            return query;
        }

        public async Task<Shop> GetShopById(int shopId)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(h => h.ShopId == shopId);

            if (shop == null)
            {
                return null;
            }

            return shop;
        }

        public async Task<Shop> CreateShop(Shop shop)
        {
            _context.Shops.Add(shop);

            await _context.SaveChangesAsync();

            return shop;
        }
        public async Task<Shop> UpdateShop(Shop updateShop)
        {
            _context.Shops.Update(updateShop);

            await _context.SaveChangesAsync();

            return updateShop;
        }

        public async Task<Shop> DeleteShop(int shopdId)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(h => h.ShopId == shopdId);

            if (shop == null)
            {
                return null;
            }

            _context.Shops.Remove(shop);

            await _context.SaveChangesAsync();

            return shop;
        }
    }
}
