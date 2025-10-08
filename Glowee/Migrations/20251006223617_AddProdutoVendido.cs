using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Glowee.Migrations
{
    /// <inheritdoc />
    public partial class AddProdutoVendido : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Vendido",
                table: "Produtos",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Vendido",
                table: "Produtos");
        }
    }
}
