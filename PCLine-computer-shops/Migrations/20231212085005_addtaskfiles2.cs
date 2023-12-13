using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PCLine_computer_shops.Migrations
{
    /// <inheritdoc />
    public partial class addtaskfiles2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskFiles_TaskEmployees_TaskEmployeeTaskId",
                table: "TaskFiles");

            migrationBuilder.DropIndex(
                name: "IX_TaskFiles_TaskEmployeeTaskId",
                table: "TaskFiles");

            migrationBuilder.DropColumn(
                name: "TaskEmployeeTaskId",
                table: "TaskFiles");

            migrationBuilder.CreateIndex(
                name: "IX_TaskFiles_TaskId",
                table: "TaskFiles",
                column: "TaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskFiles_TaskEmployees_TaskId",
                table: "TaskFiles",
                column: "TaskId",
                principalTable: "TaskEmployees",
                principalColumn: "TaskId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskFiles_TaskEmployees_TaskId",
                table: "TaskFiles");

            migrationBuilder.DropIndex(
                name: "IX_TaskFiles_TaskId",
                table: "TaskFiles");

            migrationBuilder.AddColumn<int>(
                name: "TaskEmployeeTaskId",
                table: "TaskFiles",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TaskFiles_TaskEmployeeTaskId",
                table: "TaskFiles",
                column: "TaskEmployeeTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskFiles_TaskEmployees_TaskEmployeeTaskId",
                table: "TaskFiles",
                column: "TaskEmployeeTaskId",
                principalTable: "TaskEmployees",
                principalColumn: "TaskId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
