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

        public Task<TaskEmployee> CreateTaskEmployee(TaskEmployee taskEmployee)
        {
            throw new NotImplementedException();
        }

        public Task<TaskEmployee> DeleteTaskEmployee(int taskEmployeeId)
        {
            throw new NotImplementedException();
        }

        public Task<ICollection<TaskEmployee>> GetAllTaskEmployees(string searchTerm)
        {
            throw new NotImplementedException();
        }

        public Task<TaskEmployee> GetTaskEmployeeById(int taskEmployeeId)
        {
            throw new NotImplementedException();
        }

        public Task<TaskEmployee> UpdateTaskEmployee(TaskEmployee updateTaskEmployee)
        {
            throw new NotImplementedException();
        }
    }
}
