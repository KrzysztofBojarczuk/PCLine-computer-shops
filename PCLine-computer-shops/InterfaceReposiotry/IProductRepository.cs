using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IProductRepository
    {
        Task<decimal> CountAllProductsValue();
        Task<int> CountAllproducts();
        Task<int> CountAllProductsForShopById(int shopId);
        Task<decimal> CountAllProductsValueForShopById(int shopId);
        Task<ICollection<Product>> GetAllProducts(string searchTerm);
        Task<ICollection<Product>> GetAllProductsForShopById(int productId, string searchTerm);
        Task<Product> CreateProductForShop(int shopId, Product product);
        Task<Product> GetProductById(int shopId, int productId);
        Task<Product> UpdateProduct(int shopId, Product updateProduct);
        Task<Product> DeleteProduct(int shopId, int productId);
    }
}
