using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface IEmployeeRepository
    {
        Task<decimal> CountAllEmployeesSalariesAsync();
        Task<int> CountAllEmployeesAsync();
        Task<ICollection<Employee>> GetAllEmployeesAsync(string searchTerm, List<EmployeePosition> enumEmployeePosition);
        Task<ICollection<Employee>> GetAllEmployeesForShopByIdAsync(int shopId);
        Task<Employee> CreateEmployeeForShopAsync(int shopId, Employee employee);
        Task<Employee> GetEmployeeByIdAsync(int shopId, int employeeId);
        Task<Employee> UpdateEmployeeAsync(int shopId, Employee updateEmployee);
        Task<Employee> DeleteEmployeeAsync(int shopId, int employeeId);
    }
}
