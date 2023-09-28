using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PCLine_computer_shops.Data;
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

        public async Task<ICollection<Product>> GetAllProductsForShopById(int shopId, string searchString)
        {
            var query = await _context.Shops.Include(h => h.Products).FirstOrDefaultAsync(h => h.ShopId == shopId);

            if (!String.IsNullOrEmpty(searchString))
            {
                query.Products = query.Products.Where(p => p.Name.Contains(searchString)).ToList();
            }

            if (query == null)
            {
                return null;
            }

            return query.Products;
        }

        public async Task<Product> CreateProductForShop(int shopId, Product product)
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

        public async Task<Product> GetProductById(int shopId, int productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(h => h.ProductId == productId && h.ShopId == shopId);

            if (product == null)
            {
                return null;
            }
            
            return product;
        }

        public async Task<Product> UpdateProduct(Product updateProduct)
        {
            _context.Products.Update(updateProduct);
            await _context.SaveChangesAsync();
           
            return updateProduct;
        }

        public async Task<Product> DeleteProduct(int productId)
        {
            var product = await _context.Products.FirstOrDefaultAsync(h => h.ShopId == productId);
            
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
