using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCLine_computer_shops.Dtos;
using PCLine_computer_shops.InterfaceReposiotry;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Controllers
{
    //[Authorize]
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

        [HttpGet()]
        public async Task<IActionResult> GetAllTaskEmployee(string searchTerm = null)
        {
            var taskEmployee = await _taskEmployeeRepository.GetAllTaskEmployeesAsync(searchTerm);

            var taskEmployeeGet = _mapper.Map<List<TaskEmployeeGetDto>>(taskEmployee);

            return Ok(taskEmployeeGet);
        }

        [HttpGet("{taskEmployeeId}")]
        public async Task<IActionResult> TaskEmployeeById(int taskEmployeeId)
        {
            var taskEmployee = await _taskEmployeeRepository.GetTaskEmployeeByIdAsync(taskEmployeeId);

            if (taskEmployee == null)
            {
                return NotFound();
            }

            var taskEmployeeMapped = _mapper.Map<TaskEmployeeGetDto>(taskEmployee);

            return Ok(taskEmployeeMapped);
        }

        [HttpPost()]
        public async Task<IActionResult> CreateTaskEmployee([FromForm] TaskEmployeeCreateDto taskEmployee, List<IFormFile> files)
        {
            var taskEmployeeCreate = _mapper.Map<TaskEmployee>(taskEmployee);

            foreach (var file in files)
            {
                byte[] fileBytes;
                using (MemoryStream ms = new MemoryStream())
                {
                    await file.CopyToAsync(ms);
                    fileBytes = ms.ToArray();
                }

                var taskFile = new TaskFile
                {
                    FileName = file.FileName,
                    FileContent = fileBytes
                };

                taskEmployeeCreate.TaskFiles.Add(taskFile);
            }

            await _taskEmployeeRepository.CreateTaskEmployeeAsync(taskEmployeeCreate);

            var taskEmployeeMapped = _mapper.Map<TaskEmployeeGetDto>(taskEmployeeCreate);

            return CreatedAtAction(nameof(TaskEmployeeById), new { taskEmployeeId = taskEmployeeCreate.TaskId }, taskEmployeeMapped);
        }

        [HttpPut("{taskEmployeeId}")]
        public async Task<IActionResult> UpdateTaskEmployee([FromBody] TaskEmployeeCreateDto taskEmployeeUpdate, int taskEmployeeId)
        {
            var toUpdateTaskEmployee = _mapper.Map<TaskEmployee>(taskEmployeeUpdate);

            toUpdateTaskEmployee.TaskId = taskEmployeeId;

            await _taskEmployeeRepository.UpdateTaskEmployeeAsync(toUpdateTaskEmployee);

            return NoContent();
        }

        [HttpDelete("{taskEmployeeId}")]
        public async Task<IActionResult> DeleteTaskEmployee(int taskEmployeeId)
        {
            var deletetaskEmployeeId = await _taskEmployeeRepository.DeleteTaskEmployeeAsync(taskEmployeeId);

            if (deletetaskEmployeeId == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpGet("GetTaskFiles/{taskEmployeeId}")]
        public async Task<IActionResult> TaskFiles(int taskEmployeeId)
        {
            var taskFiles = await _taskEmployeeRepository.GetTaskFilesAsync(taskEmployeeId);

            if (taskFiles == null)
            {
                return NotFound();
            }

            var taskFilesMapped = _mapper.Map<List<TaskFileGetDto>>(taskFiles);

            return Ok(taskFilesMapped);
        }

        [HttpDelete("TaskFile/{taskEmployeeId}/{taskFileId}")]
        public async Task<IActionResult> DeleteTaskFiles(int taskEmployeeId, int taskFileId)
        {
            var deleteTaskFiles = await _taskEmployeeRepository.DeleteTaskFilesAsync(taskEmployeeId, taskFileId);

            if(deleteTaskFiles == null)
            {
                return NotFound();
            }

            return NoContent();
        }

        [HttpPost("AddFiles/{taskEmployeeId}")]
        public async Task<IActionResult> AddFilesToTaskEmployee(int taskEmployeeId, [FromForm] List<IFormFile> files)
        {
            var taskEmployee = await _taskEmployeeRepository.GetTaskEmployeeByIdAsync(taskEmployeeId);

            foreach (var file in files)
            {
                byte[] fileBytes;
                using (MemoryStream ms = new MemoryStream())
                {
                    await file.CopyToAsync(ms);
                    fileBytes = ms.ToArray();
                }

                var taskFile = new TaskFile
                {
                    FileName = file.FileName,
                    FileContent = fileBytes
                };

                taskEmployee.TaskFiles.Add(taskFile);
            }

            await _taskEmployeeRepository.UpdateTaskEmployeeAsync(taskEmployee);

            return NoContent();
        }
    }
}
