using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PCLine_computer_shops.Data;
using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Extensions;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;
using System.Linq;

namespace PCLine_computer_shops.Repositories
{
    public class ShopRepository : IShopRepository
    {
        private readonly DataContext _context;

        public ShopRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<Shop>> GetAllShopsAsync(int pageNumber, int pageSize, string searchTerm, List<Country> enumCountry)
        {
            IQueryable<Shop> query = _context.Shops;

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(h => h.ShopId.ToString().Contains(searchTerm) || h.Name.ToLower().Contains(searchTerm)); 
            }

            if (enumCountry != null && enumCountry.Any())
            {
                query = query.Where(h => enumCountry.Contains(h.Country));
            }

            var paginatedList = await PaginatedList<Shop>.CreateAsync(query, pageNumber, pageSize); 

            var shops = paginatedList.Items.ToList(); 

            return shops;
        }

        public async Task<ICollection<Shop>> GetAllShopsForProductAsync()
        {
            var query = await _context.Shops.ToListAsync();

            return query;
        }

        public async Task<Shop> GetShopByIdAsync(int shopId)
        {
            var shop = await _context.Shops.FirstOrDefaultAsync(h => h.ShopId == shopId);

            if (shop == null)
            {
                return null;
            }

            return shop;
        }

        public async Task<Shop> CreateShopAsync(Shop shop)
        {
            await _context.Shops.AddAsync(shop);

            await _context.SaveChangesAsync();

            return shop;
        }

        public async Task<Shop> UpdateShopAsync(Shop updateShop)
        {
            _context.Shops.Update(updateShop);

            await _context.SaveChangesAsync();

            return updateShop;
        }

        public async Task<Shop> DeleteShopAsync(int shopdId)
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
