﻿using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCLine_computer_shops.Dtos;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskEmployeeController : ControllerBase
    {
        private readonly ITaskEmployeeRepository _taskEmployeeRepository;
        private readonly IMapper _mapper;

        public TaskEmployeeController(ITaskEmployeeRepository taskEmployee, IMapper mapper)
        {
            _taskEmployeeRepository = taskEmployee;
            _mapper = mapper;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetAllTaskEmployee(string searchTerm = "")
        {
            var taskEmployee = await _taskEmployeeRepository.GetAllTaskEmployees(searchTerm);

            var taskEmployeeGet = _mapper.Map<List<TaskEmployeeGetDto>>(taskEmployee);

            return Ok(taskEmployeeGet);
        }

        [HttpGet("Get/{taskEmployeeId}")]
        public async Task<IActionResult> TaskEmployeeById(int taskEmployeeId)
        {
            var taskEmployee = await _taskEmployeeRepository.GetTaskEmployeeById(taskEmployeeId);

            if(taskEmployee == null)
            {
                return NotFound();
            }

            var taskEmployeeGet = _mapper.Map<TaskEmployeeGetDto>(taskEmployee);

            return Ok(taskEmployeeGet);
        }

        [HttpPost("Post")]
        public async Task<IActionResult> CreateTaskEmployee([FromBody] TaskEmployeeCreateDto taskEmployee)
        {
            var taskEmployeeCreate = _mapper.Map<TaskEmployee>(taskEmployee);

            await _taskEmployeeRepository.CreateTaskEmployee(taskEmployeeCreate);

            var taskEmployeeGet = _mapper.Map<TaskEmployeeGetDto>(taskEmployeeCreate);

            return CreatedAtAction(nameof(TaskEmployeeById), new { taskEmployeeId = taskEmployeeCreate.TaskId }, taskEmployeeGet);
        }

        [HttpPut("Put/{taskEmployeeId}")]
        public async Task<IActionResult> UpdateTaskEmployee([FromBody] TaskEmployeeCreateDto taskEmployeeUpdate, int taskEmployeeId)
        {
            var toUpdateTaskEmployee = _mapper.Map<TaskEmployee>(taskEmployeeUpdate);

            toUpdateTaskEmployee.TaskId = taskEmployeeId;
            
            await _taskEmployeeRepository.UpdateTaskEmployee(toUpdateTaskEmployee);

            return NoContent();
        }

        [HttpDelete("Delete/{taskEmployeeId}")]
        public async Task<IActionResult> DeleteTaskEmployee(int taskEmployeeId)
        {
            var deletetaskEmployeeId = await _taskEmployeeRepository.DeleteTaskEmployee(taskEmployeeId);

            if (deletetaskEmployeeId == null)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}