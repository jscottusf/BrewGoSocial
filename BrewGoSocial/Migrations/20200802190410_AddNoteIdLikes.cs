using Microsoft.EntityFrameworkCore.Migrations;

namespace BrewGoSocial.Migrations
{
    public partial class AddNoteIdLikes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NotificationId",
                table: "Likes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NotificationId",
                table: "Likes");
        }
    }
}
