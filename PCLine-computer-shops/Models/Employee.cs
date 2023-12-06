using PCLine_computer_shops.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PCLine_computer_shops.Models
{
    public class Employee
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; } 
        public decimal Salary { get; set; }
        public string Email { get; set; }
        public EmployeePosition EmployeePosition { get; set; }
        [ForeignKey("ShopId")]
        public int ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
