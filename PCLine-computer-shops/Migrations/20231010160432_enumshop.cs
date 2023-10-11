using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PCLine_computer_shops.Migrations
{
    /// <inheritdoc />
    public partial class enumshop : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Shops");

            migrationBuilder.AddColumn<int>(
                name: "Country",
                table: "Shops",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Country",
                table: "Shops");

            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Shops",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
