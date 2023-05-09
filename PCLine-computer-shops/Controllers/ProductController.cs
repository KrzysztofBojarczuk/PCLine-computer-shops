﻿using AutoMapper;
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

        [HttpGet("Get")]
        public async Task<IActionResult> GetAllProducts([FromQuery] string searchString = "")
        {
            var products = await _productRepository.GetAllProducts(searchString);

            var productstGet = _mapper.Map<List<ProductGetDto>>(products);

            return Ok(productstGet);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> CreateProduct([FromBody] ProductCreateDto product)
        {
            var productCreate = _mapper.Map<Product>(product);
            await _productRepository.CreateProduct(productCreate);
            var productGet = _mapper.Map<ProductGetDto>(productCreate);
            return CreatedAtAction(nameof(ProductByIdGet), new { id = productCreate.Id }, productGet);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> ProductByIdGet(int id)
        {
            var product = await _productRepository.GetProductById(id);
            if (product == null)
            {
                return NotFound("gg");
            }
            var productGet = _mapper.Map<ProductGetDto>(product);
            return Ok(productGet);
        }
    }
}
