using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Dtos
{
    public class TaskEmployeeCreateDto
    {
        public DateTime TaskCreatedDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int TimeEstimated { get; set; }
        public StatusTask TaskStatus { get; set; }
        public string NameEmployee { get; set; }
    }
}
