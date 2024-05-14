using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PCLine_computer_shops.Data;
using PCLine_computer_shops.Enums;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly DataContext _context;
        ////private readonly IMapper _mapper;
        public ProductRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<decimal> CountAllProductsValueAsync()
        {
            var query = await _context.Products.ToListAsync();

            decimal totalValueOfProducts = query.Sum(product => product.Amount * product.Price);

            return totalValueOfProducts;
        }

        public async Task<int> CountAllproductsAsync()
        {
            var query = await _context.Products.ToListAsync();

            int totalAmount = query.Sum(product => product.Amount);

            return totalAmount;
        }

        public async Task<int> CountAllProductsForShopByIdAsync(int shopId)
        {
            int totalAmount = await _context.Products
                                        .Where(product => product.ShopId == shopId)
                                        .SumAsync(product => product.Amount);

            return totalAmount;
        }

        public async Task<decimal> CountAllProductsValueForShopByIdAsync(int shopId)
        {
            var query = await _context.Products.Where(product => product.ShopId == shopId).ToListAsync();

            decimal totalValueOfProducts = query.Sum(product => product.Amount * product.Price);

            return totalValueOfProducts;
        }

        public async Task<ICollection<Product>> GetAllProductsAsync(string searchTerm)
        {
            var query = await _context.Products.ToListAsync();

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(h => h.ProductId.ToString().Contains(searchTerm) || h.Name.ToLower().Contains(searchTerm.ToLower())).ToList();
            }

            if (query == null)
            {
                return null;
            }

            return query;
        }

        public async Task<ICollection<Product>> GetAllProductsForShopByIdAsync(int shopId, string searchTerm)
        {
            var query = await _context.Products.Where(h => h.ShopId == shopId).ToListAsync();

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(h => h.Equals(searchTerm)).ToList();
            }

            if (query == null)
            {
                return null;
            }

            return query;
        }

        public async Task<Product> CreateProductForShopAsync(int shopId, Product product)
        {
            var shop = await _context.Shops.Include(h => h.Products).FirstOrDefaultAsync(h => h.ShopId == shopId);

            if (shop == null)
            {
                return null; 
            }

            shop.Products.Add(product);

            await _context.SaveChangesAsync();

            return product;
        }

        public async Task<Product> GetProductByIdAsync(int shopId, int productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(h => h.ShopId == shopId && h.ProductId == productId);

            if (product == null)
            {
                return null;
            }
            
            return product;
        }

        public async Task<Product> UpdateProductAsync(int shopId, Product updateProduct)
        {
            _context.Products.Update(updateProduct);

            await _context.SaveChangesAsync();
           
            return updateProduct;
        }

        public async Task<Product> DeleteProductAsync(int shopId, int productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(h => h.ShopId == shopId && h.ProductId == productId);
            
            if (product == null)
            {
                return null;
            }

            _context.Products.Remove(product);

            await _context.SaveChangesAsync();
           
            return product;
        }
    }
}
