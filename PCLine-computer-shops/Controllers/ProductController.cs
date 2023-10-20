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
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet("GetNumberOfProducts")]
        public async Task<int> GetNomuberOfProducts()        
        {
            var numuberofProducts = await _productRepository.CountAllproducts();

            //if (numuberofProducts == null)
            //{
            //    return NotFound();
            //}

            return numuberofProducts;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetAllProducts([FromQuery] string searchTerm = "")
        {
            var products = await _productRepository.GetAllProducts(searchTerm);

            if (products == null)
            {
                return NotFound();
            }

            var productsGet = _mapper.Map<List<ProductGetDto>>(products);

            return Ok(productsGet);
        }

        [HttpGet("Get/{shopId}")]
        public async Task<IActionResult> GetAllProductsForShop(int shopId, [FromQuery] string searchString = "")
        {
            var products = await _productRepository.GetAllProductsForShopById(shopId, searchString);

            if (products == null)
            {
                return NotFound();
            }

            var productsGet = _mapper.Map<List<ProductGetDto>>(products);

            return Ok(productsGet);
        }

        [HttpGet("Get/{shopId}/GetProduct/{productId}")]
        public async Task<IActionResult> ProductByIdGet(int shopId, int productId)
        {
            var product = await _productRepository.GetProductById(shopId, productId);

            if (product == null)
            {
                return NotFound();
            }

            var productGet = _mapper.Map<ProductGetDto>(product); 
            
            return Ok(productGet);
        }

        [HttpPost("Post/{shopId}")]
        public async Task<IActionResult> CreateProductForShop(int shopId, [FromBody] ProductCreateDto newProduct)
        {
            var productCreate = _mapper.Map<Product>(newProduct);

            await _productRepository.CreateProductForShop(shopId, productCreate);

            if (productCreate == null)
            {
                return NotFound(); 
            }

            var productGet = _mapper.Map<ProductGetDto>(productCreate);

            return CreatedAtAction(nameof(ProductByIdGet), new { shopId = shopId, productId = productGet.ProductId }, productGet);
        }

        [HttpPut("Put/{shopId}/{productId}")]
        public async Task<IActionResult> UpdateProduct(int shopId, int productId, [FromBody] ProductCreateDto productUpdate)
        {
            var toUpdateProduct = _mapper.Map<Product>(productUpdate);

            toUpdateProduct.ProductId = productId;

            toUpdateProduct.ShopId = shopId;

            await _productRepository.UpdateProduct(shopId, toUpdateProduct);
           
            return NoContent();
        }

        [HttpDelete("Delete/{shopId}/product/{productId}")]
        public async Task<IActionResult> DeleteProduct(int shopId, int productId)
        {
            var deleteProduct = await _productRepository.DeleteProduct(shopId, productId);

            if (deleteProduct == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
