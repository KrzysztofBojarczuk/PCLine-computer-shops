using Microsoft.AspNetCore.Identity;
using PCLine_computer_shops.Models;

namespace PCLine_computer_shops.Data
{
    public class SeedData
    {
        public static async Task SeedUsersAndRolesAsync(IServiceProvider serviceProvider)
        {
            // Create scoped services
            using (var scope = serviceProvider.CreateScope())
            {
                var userManager = scope.ServiceProvider.GetRequiredService<UserManager<AppUser>>();
                var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

                // Define roles
                var roles = new[] { "Admin", "User" };

                // Create roles if they don't exist
                foreach (var role in roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                    {
                        await roleManager.CreateAsync(new IdentityRole(role));
                    }
                }

                // Create admin user
                var adminEmail = "admin@example.com";
                var adminUser = new AppUser { UserName = "admin", Email = adminEmail };
                if (userManager.Users.All(u => u.Email != adminEmail))
                {
                    var result = await userManager.CreateAsync(adminUser, "Admin123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(adminUser, "Admin");
                    }
                }

                // Create regular user
                var userEmail = "user@example.com";
                var regularUser = new AppUser { UserName = "user", Email = userEmail };
                if (userManager.Users.All(u => u.Email != userEmail))
                {
                    var result = await userManager.CreateAsync(regularUser, "User123!");
                    if (result.Succeeded)
                    {
                        await userManager.AddToRoleAsync(regularUser, "User");
                    }
                }
            }
        }
    }
}
