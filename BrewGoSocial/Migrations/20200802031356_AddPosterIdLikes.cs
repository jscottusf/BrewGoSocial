using Microsoft.EntityFrameworkCore.Migrations;

namespace BrewGoSocial.Migrations
{
    public partial class AddPosterIdLikes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PosterId",
                table: "Likes",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosterId",
                table: "Likes");
        }
    }
}
