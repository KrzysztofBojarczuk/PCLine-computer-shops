﻿using PCLine_computer_shops.Enums;

namespace PCLine_computer_shops.Models
{
    public class TaskEmployee
    {
        public int TaskEmployeeId { get; set; }
        public DateTime TaskCreatedDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int TimeEstiamted { get; set; }
        public StatusTask TaskStatus { get; set; }
        public Employee Employee { get; set; }
    }
}
