namespace PCLine_computer_shops.Models
{
    public class Shop
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime StarthDate { get; set; }
        public ICollection<Review> Reviews { get; set; }
        public ICollection<Employee> Employees { get; set; }
    }
}
