using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IProductRepository
    {
        Task<ICollection<Product>> GetAllProducts(string searchString);
        Task<Product> CreateProduct(Product product);
        Task<Product> GetProductById(int id);

    }
}
