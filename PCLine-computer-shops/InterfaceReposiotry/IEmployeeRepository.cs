using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IEmployeeRepository
    {
        Task<decimal> CountAllEmployeesSalaries();
        Task<int> CountAllEmployees();
        Task<ICollection<Employee>> GetAllEmployees(string searchString, List<EmployeePosition> enumEmployeePosition);
        Task<ICollection<Employee>> GetAllEmployeesForShopById(int shopId);
        Task<Employee> CreateEmployeeForShop(int shopId, Employee employee);
        Task<Employee> GetEmployeeById(int shopId, int employeeId);
        Task<Employee> UpdateEmployee(int shopId, Employee updateEmployee);
        Task<Employee> DeleteEmployee(int shopId, int employeeId);
    }
}
