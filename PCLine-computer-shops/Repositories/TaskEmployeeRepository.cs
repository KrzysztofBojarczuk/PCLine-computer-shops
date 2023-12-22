﻿using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PCLine_computer_shops.Data;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Repositories
{
    public class TaskEmployeeRepository : ITaskEmployeeRepository
    {
        private readonly DataContext _context;
        public TaskEmployeeRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<ICollection<TaskEmployee>> GetAllTaskEmployees(string searchTerm)
        {
            var query = await _context.TaskEmployees.ToListAsync();

            if (!searchTerm.IsNullOrEmpty())
            {
                query = query.Where(h => h.Title.ToLower().Contains(searchTerm) || h.Description.ToLower().Contains(searchTerm) || h.NameEmployee.ToLower().Contains(searchTerm)).ToList();
            }

            if (query == null)
            {
                return null;
            }

            return query;
        }

        public async Task<TaskEmployee> GetTaskEmployeeById(int taskEmployeeId)
        {
            var taskEmployee = await _context.TaskEmployees.FirstOrDefaultAsync(h => h.TaskId == taskEmployeeId);

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
            var taskEmployee = await _context.TaskEmployees.FirstOrDefaultAsync(h => h.TaskId == taskEmployeeId);

            if(taskEmployee == null)
            {
                return null;
            }

            _context.TaskEmployees.Remove(taskEmployee);

            await _context.SaveChangesAsync();

            return taskEmployee;
        }

        public async Task<ICollection<TaskFile>> GetTaskFiles(int taskEmployeeId)
        {
            var files = await _context.TaskFiles.Where(h => h.TaskId == taskEmployeeId).ToListAsync();

            if (files == null)
            {
                return null;
            }

            return files;
        }

        public async Task<TaskFile> DeleteTaskFiles(int taskEmployeeId, int taskFilesId)
        {
            var taskFiles = await _context.TaskFiles.FirstOrDefaultAsync(h => h.TaskId == taskEmployeeId && h.TaskFileId == taskFilesId);

            if (taskFiles == null)
            {
                return null;
            }

            _context.TaskFiles.Remove(taskFiles);

            await _context.SaveChangesAsync();

            return taskFiles;
        }
    }
}
