﻿using PCLine_computer_shops.Enums;

namespace PCLine_computer_shops.Dtos
{
    public class TaskEmployeeGetDto
    {
        public int TaskId { get; set; }
        public DateTime TaskCreatedDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int TimeEstimated { get; set; }
        public StatusTask TaskStatus { get; set; }
        public string NameEmployee { get; set; }
        public ICollection<TaskFileGetDto> TaskFiles { get; set; }
    }
}
