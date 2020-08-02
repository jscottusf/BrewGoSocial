using Microsoft.EntityFrameworkCore.Migrations;

namespace BrewGoSocial.Migrations
{
    public partial class AddFollowLogic : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Follows_Users_UserId",
                table: "Follows");

            migrationBuilder.DropColumn(
                name: "FollowName",
                table: "Follows");

            migrationBuilder.DropColumn(
                name: "FollowSlug",
                table: "Follows");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Follows",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Follows_Users_UserId",
                table: "Follows",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Follows_Users_UserId",
                table: "Follows");

            migrationBuilder.AlterColumn<int>(
                name: "UserId",
                table: "Follows",
                type: "int",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<string>(
                name: "FollowName",
                table: "Follows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FollowSlug",
                table: "Follows",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Follows_Users_UserId",
                table: "Follows",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
