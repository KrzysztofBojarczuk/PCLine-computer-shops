using System.ComponentModel.DataAnnotations.Schema;

namespace PCLine_computer_shops.Models
{
    public class TaskFile
    {
        public int TaskFileId { get; set; }
        public string FileName { get; set; }
        public byte[] FileContent { get; set; }
        [ForeignKey("TaskId")]
        public int TaskId { get; set; }
        public TaskEmployee TaskEmployee { get; set; }
    }
}
