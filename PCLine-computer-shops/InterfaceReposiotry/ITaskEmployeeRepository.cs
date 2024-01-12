using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface ITaskEmployeeRepository
    {
        Task<ICollection<TaskEmployee>> GetAllTaskEmployeesAsync(string searchTerm);
        Task<TaskEmployee> CreateTaskEmployeeAsync(TaskEmployee taskEmployee);
        Task<TaskEmployee> GetTaskEmployeeByIdAsync(int taskEmployeeId);
        Task<TaskEmployee> UpdateTaskEmployeeAsync(TaskEmployee updateTaskEmployee);
        Task<TaskEmployee> DeleteTaskEmployeeAsync(int taskEmployeeId);
        Task<ICollection<TaskFile>> GetTaskFilesAsync(int taskEmployeeId);
        Task<TaskFile> DeleteTaskFilesAsync(int taskEmployeeId, int TaskFileId);
    }
}
