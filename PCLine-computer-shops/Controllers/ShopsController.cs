using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCLine_computer_shops.Dtos;
using PCLine_computer_shops.Enums;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ShopsController : ControllerBase
    {
        private readonly IShopRepository _shopRepository;
        private readonly IMapper _mapper;

        public ShopsController(IShopRepository shopRepository, IMapper mapper)
        {
            _shopRepository = shopRepository;
            _mapper = mapper;
        }

        [HttpGet("GetAllShopsForProduct")]
        public async Task<IActionResult> GetAllShopsForProduct()
        {
            var shops = await _shopRepository.GetAllShopsForProductAsync();

            var shopsMapped = _mapper.Map<List<ShopGetDto>>(shops);

            return Ok(shopsMapped);
        }


        [HttpGet("Get")]
        public async Task<IActionResult> GetAllShops(int pageNumber, int pageSize, string searchTerm = "", [FromQuery] List<Country> enumCountry = null)
        {
            var shops = await _shopRepository.GetAllShopsAsync(pageNumber, pageSize, searchTerm, enumCountry);

            var shopsMapped = _mapper.Map<List<ShopGetDto>>(shops);

            return Ok(shopsMapped);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> CreateShop([FromBody] ShopCreateDto shop)
        {
            var shopCreate = _mapper.Map<Shop>(shop);

            await _shopRepository.CreateShopAsync(shopCreate);

            var shopMapped = _mapper.Map<ShopGetDto>(shopCreate);

            return CreatedAtAction(nameof(ShopByIdGet), new { shopId = shopCreate.ShopId }, shopMapped);
        }

        [HttpGet("Get/{shopId}")]
        public async Task<IActionResult> ShopByIdGet(int shopId)
        {
            var shop = await _shopRepository.GetShopByIdAsync(shopId);

            if (shop == null)
            {
                return NotFound();
            }

            var shopMapped = _mapper.Map<ShopGetDto>(shop);

            return Ok(shopMapped);
        }

        [HttpPut("Put/{shopId}")]
        public async Task<IActionResult> UpdateShop([FromBody] ShopCreateDto shopUpdate, int shopId)
        {
            var toUpdateShop = _mapper.Map<Shop>(shopUpdate);

            toUpdateShop.ShopId = shopId;
            await _shopRepository.UpdateShopAsync(toUpdateShop);

            return NoContent();
        }

        [HttpDelete("Delete/{shopId}")]
        public async Task<IActionResult> DeleteShop(int shopId)
        {
            var deleteShop = await _shopRepository.DeleteShopAsync(shopId);

            if (deleteShop == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
