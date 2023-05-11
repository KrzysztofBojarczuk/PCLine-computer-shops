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
        public async Task<ICollection<Product>> GetAllProducts(string searchString)
        {

            var query = await _context.Products.ToListAsync();


            if (!String.IsNullOrEmpty(searchString))
            {
                query = query.Where(x => x.Name.Contains(searchString)).ToList();
            }

            return query;
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

        public async Task<Product> UpdateProduct(Product updateProduct)
        {
            _context.Products.Update(updateProduct);
            await _context.SaveChangesAsync();
            return updateProduct;
        }
    }
}
