using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using PCLine_computer_shops.Dtos;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet("GetValueOfProducts")]
        public async Task<decimal> GetValueOfProducts()
        {
            var numuberofProducts = await _productRepository.CountAllProductsValueAsync();

            if (numuberofProducts == null)
            {
                return 0;
            }

            return numuberofProducts;
        }


        [HttpGet("GetNumberOfProducts")]
        public async Task<int> GetNomuberOfProducts()        
        {
            var numuberofProducts = await _productRepository.CountAllproductsAsync();

            if (numuberofProducts == null)
            {
                return 0;
            }

            return numuberofProducts;
        }

        [HttpGet("GetNumberOfProductsForShop/{shopId}")]
        public async Task<int> GetNomuberOfProductsForShop(int shopId)
        {
            var numuberofProductsForShop = await _productRepository.CountAllProductsForShopByIdAsync(shopId);

            if (numuberofProductsForShop == null)
            {
                return 0;
            }

            return numuberofProductsForShop;
        }

        [HttpGet("GetValueProductsForShop/{shopId}")]
        public async Task<decimal> GetValueOfProductsForShop(int shopId)
        {
            var valueofProductsForShop = await _productRepository.CountAllProductsValueForShopByIdAsync(shopId);

            if (valueofProductsForShop == null)
            {
                return 0;
            }

            return valueofProductsForShop;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllProducts([FromQuery] string searchTerm = null)
        {
            var products = await _productRepository.GetAllProductsAsync(searchTerm);

            if (products == null)
            {
                return NotFound();
            }

            var productsMapped = _mapper.Map<List<ProductGetDto>>(products);

            return Ok(productsMapped);
        }

        [HttpGet("{shopId}")]
        public async Task<IActionResult> GetAllProductsForShop(int shopId, [FromQuery] string searchTerm = null)
        {
            var products = await _productRepository.GetAllProductsForShopByIdAsync(shopId, searchTerm);

            if (products == null)
            {
                return NotFound();
            }

            var productsMapped = _mapper.Map<List<ProductGetDto>>(products);

            return Ok(productsMapped);
        }

        [HttpGet("{shopId}/GetProduct/{productId}")]
        public async Task<IActionResult> ProductByIdGet(int shopId, int productId)
        {
            var product = await _productRepository.GetProductByIdAsync(shopId, productId);

            if (product == null)
            {
                return NotFound();
            }

            var productMapped = _mapper.Map<ProductGetDto>(product); 
            
            return Ok(productMapped);
        }

        [HttpPost("{shopId}")]
        public async Task<IActionResult> CreateProductForShop(int shopId, [FromBody] ProductCreateDto newProduct)
        {
            var productCreate = _mapper.Map<Product>(newProduct);

            await _productRepository.CreateProductForShopAsync(shopId, productCreate);

            if (productCreate == null)
            {
                return NotFound(); 
            }

            var productMapped = _mapper.Map<ProductGetDto>(productCreate);

            return CreatedAtAction(nameof(ProductByIdGet), new { shopId = shopId, productId = productMapped.ProductId }, productMapped);
        }

        [HttpPut("{shopId}/{productId}")]
        public async Task<IActionResult> UpdateProduct(int shopId, int productId, [FromBody] ProductCreateDto productUpdate)
        {
            var toUpdateProduct = _mapper.Map<Product>(productUpdate);

            toUpdateProduct.ProductId = productId;

            toUpdateProduct.ShopId = shopId;

            await _productRepository.UpdateProductAsync(shopId, toUpdateProduct);
           
            return NoContent();
        }

        [HttpDelete("{shopId}/product/{productId}")]
        public async Task<IActionResult> DeleteProduct(int shopId, int productId)
        {
            var deleteProduct = await _productRepository.DeleteProductAsync(shopId, productId);

            if (deleteProduct == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
