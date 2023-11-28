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

            CreateMap<ShopCreateDto, Shop>();
            CreateMap<Shop, ShopGetDto>();

            CreateMap<AddressCreateDto, Address>();
            CreateMap<Address, AddressGetDto>();

            CreateMap<EmployeeCreateDto, Employee>();
            CreateMap<Employee, EmployeeGetDto>();

            CreateMap<TaskEmployeeCreateDto, TaskEmployee>();
            CreateMap<TaskEmployee, TaskEmployeeGetDto>();
        }
    }
}
