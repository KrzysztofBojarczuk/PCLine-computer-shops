using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PCLine_computer_shops.Data;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Repositories
{
    public class TaskEmployeeRepository : ITaskEmployee
    {
        private readonly DataContext _context;
        public TaskEmployeeRepository(DataContext context)
        {
            _context = context;
        }


        public async Task<ICollection<TaskEmployee>> GetAllTaskEmployees(string searchTerm)
        {
            var query = await _context.TaskEmployees.ToListAsync();

            if (query == null)
            {
                return null;
            }

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(h => h.Title.Contains(searchTerm) || h.Employee.FirstName.ToLower().Contains(searchTerm)).ToList();
            }

            return query;
        }

        public async Task<TaskEmployee> GetTaskEmployeeById(int taskEmployeeId)
        {
            var taskEmployee = await _context.TaskEmployees.FirstOrDefaultAsync(h => h.TaskEmployeeId == taskEmployeeId);

            if (taskEmployee == null)
            {
                return null;
            }

            return taskEmployee;
        }

        public async Task<TaskEmployee> CreateTaskEmployee(TaskEmployee taskEmployee)
        {
            _context.TaskEmployees.Add(taskEmployee);

            await _context.SaveChangesAsync();

            return taskEmployee;
        }

        public async Task<TaskEmployee> UpdateTaskEmployee(TaskEmployee updateTaskEmployee)
        {
            _context.Update(updateTaskEmployee);

            await _context.SaveChangesAsync();

            return updateTaskEmployee;
        }

        public async Task<TaskEmployee> DeleteTaskEmployee(int taskEmployeeId)
        {
            var taskEmployee = await _context.TaskEmployees.FirstOrDefaultAsync(h => h.TaskEmployeeId == taskEmployeeId);

            if(taskEmployee == null)
            {
                return null;
            }

            _context.TaskEmployees.Remove(taskEmployee);

            await _context.SaveChangesAsync();

            return taskEmployee;
        }
    }
}
