using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
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
        public async Task<ICollection<Product>> GetAllProducts()
        {
            return await _context.Products.ToListAsync();
        }
        public async Task<Product> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }
        public async Task<Product> GetProductById(int id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(h => h.Id == id);
            if (product == null)
            {
                return null;
            }
            return product;
        }
    }
}
