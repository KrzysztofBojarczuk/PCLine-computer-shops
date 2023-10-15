using PCLine_computer_shops.Enums;

namespace PCLine_computer_shops.Dtos
{
    public class EmployeeCreateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public decimal Salary { get; set; }
        public string Email { get; set; }
        public EmployeePosition EmployeePosition { get; set; }
    }
}
