using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCLine_computer_shops.Dtos;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;
using PCLine_computer_shops.Repositories;

namespace PCLine_computer_shops.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private readonly IAddressRepository _addressRepository;
        private readonly IShopRepository _shopRepository;
        private readonly IMapper _mapper;

        public AddressController(IAddressRepository addressRepository, IMapper mapper, IShopRepository shopRepository = null)
        {
            _addressRepository = addressRepository;
            _mapper = mapper;
            _shopRepository = shopRepository;
        }

        [HttpGet("{shopId}")]
        public async Task<IActionResult> GetAddres(int shopId)
        {
            var address = await _addressRepository.GetAddressForShopByIdAsync(shopId);

            if (address == null)
            {
                return NotFound();
            }

            var addressMapped = _mapper.Map<AddressGetDto>(address);

            return Ok(addressMapped);
        }


        [HttpPost("{shopId}")]
        public async Task<IActionResult> AddAddressToShop(int shopId, [FromBody] AddressCreateDto addressDto)
        {
            var shop = await _shopRepository.GetShopByIdAsync(shopId);

            if (shop == null)
            {
                return NotFound();
            }

            var addressMapped = _mapper.Map<Address>(addressDto);

            var addedAddress = await _addressRepository.CreateAddressToShopAsync(shopId, addressMapped);

            if (addedAddress == null)
            {
                return BadRequest();
            }

            return Ok();
        }

        [HttpDelete("{shopId}")]
        public async Task<IActionResult> DeleteAddressToShop(int shopId)
        {
            var deleteAddress = await _addressRepository.DeleteAddressForShopAsync(shopId);

            if(deleteAddress == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
