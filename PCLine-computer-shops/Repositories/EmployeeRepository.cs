using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PCLine_computer_shops.Data;
using PCLine_computer_shops.Enums;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DataContext _context;

        public EmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<decimal> CountAllEmployeesSalariesAsync()
        {
            var query = await _context.Employees.ToListAsync();

            decimal totalSalaries = query.Sum(employee => employee.Salary);

            return totalSalaries;
        }

        public async Task<int> CountAllEmployeesAsync()
        {
            var query = await _context.Employees.ToListAsync();

            return query.Count();
        }

        public async Task<ICollection<Employee>> GetAllEmployeesAsync(string searchTerm, List<EmployeePosition> enumEmployeePosition)
        {
            var query = await _context.Employees.ToListAsync();

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(h => h.EmployeeId.ToString().Contains(searchTerm) || h.FirstName.ToLower().Contains(searchTerm) || h.LastName.ToLower().Contains(searchTerm)).ToList();
            }

            if (query == null)
            {
                return null;
            }

            if(enumEmployeePosition == null)
            {
                enumEmployeePosition = new List<EmployeePosition>();
            }

            if(enumEmployeePosition.Any())
            {
                query = query.Where(h => enumEmployeePosition.Contains(h.EmployeePosition)).ToList();
            }

            return query;
        }

        public async Task<ICollection<Employee>> GetAllEmployeesForShopByIdAsync(int shopId)
        {
            var query = await _context.Employees.Where(h => h.ShopId == shopId).ToListAsync();

            if (query == null)
            {
                return null;
            }

            return query;
        }

        public async Task<Employee> GetEmployeeByIdForShopAsync(int shopId, int employeeId)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(h => h.EmployeeId == employeeId && h.ShopId == shopId);

            if (employee == null)
            {
                return null;
            }

            return employee;
        }

        public async Task<Employee> CreateEmployeeForShopAsync(int shopId, Employee employee)
        {
            var shop = await _context.Shops.Include(h => h.Employees).FirstOrDefaultAsync(h => h.ShopId == shopId);

            if (shop == null)
            {
                return null;
            }

            shop.Employees.Add(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

        public async Task<Employee> GetEmployeeByIdAsync(int shopId, int employeeId)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(h => h.ShopId == shopId && h.EmployeeId == employeeId);

            if (employee == null)
            {
                return null;
            }

            return employee;
        }

        public async Task<Employee> UpdateEmployeeAsync(int shopId, Employee updateEmployee)
        {
            _context.Employees.Update(updateEmployee);
            await _context.SaveChangesAsync();

            return updateEmployee;
        }

        public async Task<Employee> DeleteEmployeeAsync(int shopId, int employeeId)
        {
            var employee = await _context.Employees.FirstOrDefaultAsync(h => h.ShopId == shopId && h.EmployeeId == employeeId);

            if (employee == null)
            {
                return null;
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return employee;
        }

    }
}
