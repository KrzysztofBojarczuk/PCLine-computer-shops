using PCLine_computer_shops.Enums;
using System.ComponentModel.DataAnnotations;

namespace PCLine_computer_shops.Models
{
    public class TaskEmployee
    {
        [Key]
        public int TaskId { get; set; }
        public DateTime TaskCreatedDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int TimeEstimated { get; set; }
        public StatusTask TaskStatus { get; set; }
        public string NameEmployee { get; set; }
        public ICollection<TaskFile> TaskFiles { get; set; } = new List<TaskFile>();
    }
}
