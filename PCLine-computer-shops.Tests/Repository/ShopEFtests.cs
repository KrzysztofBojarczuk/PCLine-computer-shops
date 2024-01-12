using Microsoft.EntityFrameworkCore;
using PCLine_computer_shops.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;
using PCLine_computer_shops.Models;
using System.Xml.Serialization;
using PCLine_computer_shops.Repositories;

namespace PCLine_computer_shops.Tests.Repository
{
    public class ShopEFtests
    {

        private async Task<DataContext> GetDatabaseContext()
        {
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var databaseContext = new DataContext(options);
            databaseContext.Database.EnsureCreated();
            if (await databaseContext.Shops.CountAsync() <= 0)
            {
                for (int i = 1; i < 10; i++)
                {
                    databaseContext.Shops.Add(
                        new Shop()
                        {
                            Name = "Tests"

                        });
                    await databaseContext.SaveChangesAsync();
                }
            }

            return databaseContext;
        }

        [Fact]
        public async Task GetShopById()
        {
            var shop = new Shop()
            {
                Name = "Tests"
            };

            var dbContext = await GetDatabaseContext();
            var shopsRespository = new ShopRepository(dbContext);

            var result = shopsRespository.CreateShopAsync(shop);
            result.Should();
        }

        [Fact]
        public async void GetShopRepositroy()
        {
            var shopId = 1;
            var dbContext = await GetDatabaseContext();
            var shopRepository = new ShopRepository(dbContext);

            var result = shopRepository.GetShopByIdAsync(shopId);

            result.Should().NotBe(0);
        }
    }
}
