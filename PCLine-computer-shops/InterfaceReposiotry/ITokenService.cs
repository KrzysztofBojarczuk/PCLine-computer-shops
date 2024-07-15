using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.InterfaceReposiotry
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}
