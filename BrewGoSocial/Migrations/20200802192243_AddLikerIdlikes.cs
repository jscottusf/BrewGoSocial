using Microsoft.EntityFrameworkCore.Migrations;

namespace BrewGoSocial.Migrations
{
    public partial class AddLikerIdlikes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NotificationId",
                table: "Likes");

            migrationBuilder.AddColumn<int>(
                name: "LikerId",
                table: "Notifications",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LikerId",
                table: "Notifications");

            migrationBuilder.AddColumn<int>(
                name: "NotificationId",
                table: "Likes",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
