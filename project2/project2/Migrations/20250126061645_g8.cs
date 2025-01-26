using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project2.Migrations
{
    /// <inheritdoc />
    public partial class g8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "p_name",
                table: "Cart",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "p_price",
                table: "Cart",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "p_name",
                table: "Cart");

            migrationBuilder.DropColumn(
                name: "p_price",
                table: "Cart");
        }
    }
}
