using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCLine_computer_shops.Dtos;
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
        public async Task<IActionResult> GetAllShops([FromQuery] string searchString = "")
        {
            var shops = await _shopRepository.GetAllShops(searchString);
            var shopsGet = _mapper.Map<List<ShopGetDto>>(shops);
            return Ok(shopsGet);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> CreateShop([FromBody] ShopCreateDto shop)
        {
            var shopCreate = _mapper.Map<Shop>(shop);
            await _shopRepository.CreateShop(shopCreate);
            var shopGet = _mapper.Map<ShopGetDto>(shopCreate);
            return CreatedAtAction(nameof(ShopByIdGet), new { id = shopCreate.Id }, shopGet);
        }

        [HttpGet("Get/{id}")]
        public async Task<IActionResult> ShopByIdGet(int id)
        {
            var shop = await _shopRepository.GetShopById(id);
            if (shop == null)
            {
                return NotFound();
            }
            var shopGet = _mapper.Map<ShopGetDto>(shop);
            return Ok(shopGet);
        }

        [HttpPut("Put/{id}")]
        public async Task<IActionResult> UpdateShop([FromBody] ShopCreateDto shopUpdate, int id)
        {
            var toUpdateShop = _mapper.Map<Shop>(shopUpdate);
            toUpdateShop.Id = id;
            await _shopRepository.UpdateShop(toUpdateShop);
            return NoContent();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteShop(int id)
        {
            var deleteShop = await _shopRepository.DeleteShop(id);

            if (deleteShop == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
