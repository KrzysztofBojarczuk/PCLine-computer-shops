using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IProductRepository
    {
        Task<decimal> CountAllProductsValueAsync();
        Task<int> CountAllproductsAsync();
        Task<int> CountAllProductsForShopByIdAsync(int shopId);
        Task<decimal> CountAllProductsValueForShopByIdAsync(int shopId);
        Task<ICollection<Product>> GetAllProductsAsync(string searchTerm);
        Task<ICollection<Product>> GetAllProductsForShopByIdAsync(int productId, string searchTerm);
        Task<Product> CreateProductForShopAsync(int shopId, Product product);
        Task<Product> GetProductByIdAsync(int shopId, int productId);
        Task<Product> UpdateProductAsync(int shopId, Product updateProduct);
        Task<Product> DeleteProductAsync(int shopId, int productId);
    }
}
