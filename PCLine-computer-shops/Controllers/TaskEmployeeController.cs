using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PCLine_computer_shops.Dtos;
using PCLine_computer_shops.InterfaceReposiotry;

namespace PCLine_computer_shops.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskEmployeeController : ControllerBase
    {
        private readonly ITaskEmployee _taskEmployee;
        private readonly IMapper _mapper;

        public TaskEmployeeController(ITaskEmployee taskEmployee, IMapper mapper)
        {
            _taskEmployee = taskEmployee;
            _mapper = mapper;
        }

        [HttpGet("Get")]
        public async Task<IActionResult> GetAllTaskEmployee(string searchTerm = "")
        {
            var taskEmployee = await _taskEmployee.GetAllTaskEmployees(searchTerm);

            var taskEmployeeGet = _mapper.Map<List<TaskEmployeeGetDto>>(taskEmployee);

            return Ok(taskEmployeeGet);
        }
    }
}
