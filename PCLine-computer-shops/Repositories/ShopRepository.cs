using PCLine_computer_shops.Data;

namespace PCLine_computer_shops.Repositories
{
    public class ShopRepository
    {
        private readonly DataContext _context;

        public ShopRepository(DataContext context)
        {
            _context = context;
        }
    }
}
