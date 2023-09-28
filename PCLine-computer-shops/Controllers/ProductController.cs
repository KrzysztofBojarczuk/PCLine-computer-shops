using AutoMapper;
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
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public ProductController(IProductRepository productRepository, IMapper mapper)
        {
            _productRepository = productRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllProductsForShop/{shopId}")]
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

        [HttpGet("Get{shopId}/GetProduct/{productId}")]
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

        [HttpPut("Put/id")]
        public async Task<IActionResult> UpdateProduct([FromBody] ProductCreateDto productUpdate,int id)
        {
            var toUpdateProduct = _mapper.Map<Product>(productUpdate);
            toUpdateProduct.ShopId = id;
            await _productRepository.UpdateProduct(toUpdateProduct);
           
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var deleteProduct = await _productRepository.DeleteProduct(id);

            if (deleteProduct == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
