using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BugTrackingSystem.Data.Migrations
{
    public partial class AddAssignedToToBug : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssignedToId",
                table: "Bugs",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Bugs_AssignedToId",
                table: "Bugs",
                column: "AssignedToId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bugs_AspNetUsers_AssignedToId",
                table: "Bugs",
                column: "AssignedToId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bugs_AspNetUsers_AssignedToId",
                table: "Bugs");

            migrationBuilder.DropIndex(
                name: "IX_Bugs_AssignedToId",
                table: "Bugs");

            migrationBuilder.DropColumn(
                name: "AssignedToId",
                table: "Bugs");
        }
    }
}
