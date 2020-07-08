using Microsoft.EntityFrameworkCore.Migrations;

namespace BrewGoSocial.Migrations
{
    public partial class BreweryRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "SavedBreweries",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "SavedBreweries");
        }
    }
}
