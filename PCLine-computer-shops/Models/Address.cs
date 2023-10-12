using System.ComponentModel.DataAnnotations.Schema;

namespace PCLine_computer_shops.Models
{
    public class Address
    {
        public int AddressId { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string ZipCode { get; set; }
        public Shop? Shop { get; set; }
    }
}
