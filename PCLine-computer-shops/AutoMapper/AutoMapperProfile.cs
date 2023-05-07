using AutoMapper;
using PCLine_computer_shops.Dtos;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.AutoMapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<ProductCreateDto, Product>();
            CreateMap<Product, ProductGetDto>();
        }
    }
}
