using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCLine_computer_shops.Dtos;
using PCLine_computer_shops.Enums;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Controllers
{
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

        [HttpGet("Get")]
        public async Task<IActionResult> GetAllShops([FromQuery] List<Country> enumCountry = null, string searchTerm = "")
        {
            //if (enumCountry == null || enumCountry.Count == 0)
            //{
            //    enumCountry = new List<Country>(); 
            //}

            var shops = await _shopRepository.GetAllShops(searchTerm, enumCountry);
            var shopsGet = _mapper.Map<List<ShopGetDto>>(shops);

            return Ok(shopsGet);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> CreateShop([FromBody] ShopCreateDto shop)
        {
            var shopCreate = _mapper.Map<Shop>(shop);

            await _shopRepository.CreateShop(shopCreate);

            var shopGet = _mapper.Map<ShopGetDto>(shopCreate);

            return CreatedAtAction(nameof(ShopByIdGet), new { shopId = shopCreate.ShopId }, shopGet);
        }

        [HttpGet("Get/{shopId}")]
        public async Task<IActionResult> ShopByIdGet(int shopId)
        {
            var shop = await _shopRepository.GetShopById(shopId);

            if (shop == null)
            {
                return NotFound();
            }

            var shopGet = _mapper.Map<ShopGetDto>(shop);

            return Ok(shopGet);
        }

        [HttpPut("Put/{shopId}")]
        public async Task<IActionResult> UpdateShop([FromBody] ShopCreateDto shopUpdate, int shopId)
        {
            var toUpdateShop = _mapper.Map<Shop>(shopUpdate);

            toUpdateShop.ShopId = shopId;
            await _shopRepository.UpdateShop(toUpdateShop);

            return NoContent();
        }

        [HttpDelete("Delete/{shopId}")]
        public async Task<IActionResult> DeleteShop(int shopId)
        {
            var deleteShop = await _shopRepository.DeleteShop(shopId);

            if (deleteShop == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
