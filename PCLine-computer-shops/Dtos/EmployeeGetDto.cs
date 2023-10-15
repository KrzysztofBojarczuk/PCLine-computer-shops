using PCLine_computer_shops.Enums;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Dtos
{
    public class EmployeeGetDto
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal Salary { get; set; }
        public string Email { get; set; }
        public EmployeePosition EmployeePosition { get; set; }
        public int ShopId { get; set; }
        public Shop Shop { get; set; }
    }
}
