using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PCLine_computer_shops.Migrations
{
    /// <inheritdoc />
    public partial class fix3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StarthDate",
                table: "Shops",
                newName: "StartDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Shops",
                newName: "StarthDate");
        }
    }
}
