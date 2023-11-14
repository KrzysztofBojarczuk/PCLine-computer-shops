using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface ITaskEmployee
    {
        Task<ICollection<TaskEmployee>> GetAllTaskEmployees(string searchTerm);
        Task<TaskEmployee> CreateTaskEmployee(TaskEmployee taskEmployee);
        Task<TaskEmployee> GetTaskEmployeeById(int taskEmployeeId);
        Task<TaskEmployee> UpdateTaskEmployee(TaskEmployee updateTaskEmployee);
        Task<TaskEmployee> DeleteTaskEmployee(int taskEmployeeId);
    }
}
