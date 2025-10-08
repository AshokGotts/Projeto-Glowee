using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Glowee.Migrations
{
    /// <inheritdoc />
    public partial class FixProdutoControllerCrateMethod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ProdutoId",
                table: "Produtos",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Produtos",
                newName: "ProdutoId");
        }
    }
}
