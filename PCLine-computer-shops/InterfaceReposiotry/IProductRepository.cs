using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IProductRepository
    {
        Task<ICollection<Product>> GetAllProductsForShopById(int productId, string searchString);
        Task<Product> CreateProductForShop(int shopId, Product product);
        Task<Product> GetProductById(int shopId, int productId);
        Task<Product> UpdateProduct(int shopId, Product updateProduct);
        Task<Product> DeleteProduct(int shopId, int productId);
    }
}
