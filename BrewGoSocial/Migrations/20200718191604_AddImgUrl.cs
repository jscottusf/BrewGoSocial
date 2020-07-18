using Microsoft.EntityFrameworkCore.Migrations;

namespace BrewGoSocial.Migrations
{
    public partial class AddImgUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ProfileImgUrl",
                table: "Profiles",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ProfileImgUrl",
                table: "Posts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfileImgUrl",
                table: "Profiles");

            migrationBuilder.DropColumn(
                name: "ProfileImgUrl",
                table: "Posts");
        }
    }
}
