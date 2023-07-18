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

        public async Task<Shop> DeleteShop(int id)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(h => h.Id == id);

            if (shop == null)
            {
                return null;
            }

            _context.Shops.Remove(shop);
            await _context.SaveChangesAsync();

            return shop;
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

        public async Task<Shop> UpdateShop(Shop updateShop)
        {
            _context.Shops.Update(updateShop);
            await _context.SaveChangesAsync();

            return updateShop;
        }
    }
}
