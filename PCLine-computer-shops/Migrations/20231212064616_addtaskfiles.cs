using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PCLine_computer_shops.Migrations
{
    /// <inheritdoc />
    public partial class addtaskfiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaskFiles",
                columns: table => new
                {
                    TaskFileId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileContent = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    TaskId = table.Column<int>(type: "int", nullable: false),
                    TaskEmployeeTaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskFiles", x => x.TaskFileId);
                    table.ForeignKey(
                        name: "FK_TaskFiles_TaskEmployees_TaskEmployeeTaskId",
                        column: x => x.TaskEmployeeTaskId,
                        principalTable: "TaskEmployees",
                        principalColumn: "TaskId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskFiles_TaskEmployeeTaskId",
                table: "TaskFiles",
                column: "TaskEmployeeTaskId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaskFiles");
        }
    }
}
