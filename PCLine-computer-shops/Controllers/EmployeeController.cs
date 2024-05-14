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
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;

        public EmployeeController(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            _employeeRepository = employeeRepository;
            _mapper = mapper;
        }

        [HttpGet("GetNumberOfEmployeesForShop/{shopId}")]
        public async Task<ActionResult<int>> GetNumberOfEmployeesForShop(int shopId)
        {
            var employeeShop = await _employeeRepository.GetAllEmployeesForShopByIdAsync(shopId);

            if (employeeShop == null)
            {
                return NotFound();
            }

            return Ok(employeeShop.Count());
        }

        [HttpGet("GetTotalSalariesOfEmployees")]
        public async Task<decimal> GetNumberOfEmployeesSalaries()
        {
            var employeesSalaries = await _employeeRepository.CountAllEmployeesSalariesAsync();

            return employeesSalaries;
        }

        [HttpGet("GetNumberOfEmployees")]
        public async Task<int> GetNumberOfEmployees()
        {
            var numberOfEmployees = await _employeeRepository.CountAllEmployeesAsync();
            
            return numberOfEmployees;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllEmployees([FromQuery] List<EmployeePosition> enumEmployeePosition, string searchTerm = null)
        {
            var employees = await _employeeRepository.GetAllEmployeesAsync(searchTerm, enumEmployeePosition);

            if (employees == null)
            {
                return NotFound();
            }

            var employeesMapped = _mapper.Map<List<EmployeeGetDto>>(employees);

            return Ok(employeesMapped);
        }

        [HttpGet("{shopId}")]
        public async Task<IActionResult> GetAllEmployeeForShpById(int shopId)
        {
            var shop = await _employeeRepository.GetAllEmployeesForShopByIdAsync(shopId);

                if(shop == null)
                {
                    return NotFound();
                }
            
            var employesMapped = _mapper.Map<List<EmployeeGetDto>>(shop);

            return Ok(employesMapped);
        }

        [HttpGet("{shopId}/GetEmployee/{employeeId}")]
        public async Task<IActionResult> GetEmployeeById(int shopId, int employeeId)
        {
            var employee = await _employeeRepository.GetEmployeeByIdAsync(shopId, employeeId);

            if (employee == null)
            {
                return NotFound();
            }

            var employeeMapped = _mapper.Map<EmployeeGetDto>(employee);

            return Ok(employeeMapped);
        }

        [HttpPost("{shopId}")]
        public async Task<IActionResult> CreateEmployee(int shopId, [FromBody] EmployeeCreateDto newEmployee)
        {
            var employeeCreate = _mapper.Map<Employee>(newEmployee);

            await _employeeRepository.CreateEmployeeForShopAsync(shopId, employeeCreate);

            if (employeeCreate == null)
            {
                return NotFound();
            }

            var employeeMapped = _mapper.Map<EmployeeGetDto>(employeeCreate);

            return CreatedAtAction(nameof(GetEmployeeById), new { shopId = shopId, employeeId = employeeMapped.EmployeeId }, employeeMapped);
        }

        [HttpPut("{shopId}/{employeeId}")]
        public async Task<IActionResult> UpdateEmployee(int shopId, int employeeId, [FromBody] EmployeeCreateDto employeeUpdate)
        {
            var toUpdateEmployee = _mapper.Map<Employee>(employeeUpdate);

            toUpdateEmployee.EmployeeId = employeeId;

            toUpdateEmployee.ShopId = shopId;

            await _employeeRepository.UpdateEmployeeAsync(shopId, toUpdateEmployee);

            return NoContent();
        }

        [HttpDelete("{shopId}/employee/{employeeId}")]
        public async Task<IActionResult> DeleteEmployee(int shopId, int employeeId)
        {
            var deleteEmployee = await _employeeRepository.DeleteEmployeeAsync(shopId, employeeId);

            if (deleteEmployee == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
