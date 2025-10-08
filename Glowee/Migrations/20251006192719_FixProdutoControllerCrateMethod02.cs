using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Glowee.Migrations
{
    /// <inheritdoc />
    public partial class FixProdutoControllerCrateMethod02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Produtos",
                newName: "ProdutoId");

            migrationBuilder.AddColumn<int>(
                name: "UserUsuarioId",
                table: "Produtos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_UserUsuarioId",
                table: "Produtos",
                column: "UserUsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Users_UserUsuarioId",
                table: "Produtos",
                column: "UserUsuarioId",
                principalTable: "Users",
                principalColumn: "UsuarioId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Users_UserUsuarioId",
                table: "Produtos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_UserUsuarioId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "UserUsuarioId",
                table: "Produtos");

            migrationBuilder.RenameColumn(
                name: "ProdutoId",
                table: "Produtos",
                newName: "Id");
        }
    }
}
