using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Glowee.Migrations
{
    /// <inheritdoc />
    public partial class AjusteRelacionamentosVendaProduto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Users_ClienteId",
                table: "Vendas");

            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Users_VendedorId",
                table: "Vendas");

            migrationBuilder.AddForeignKey(
                name: "FK_Vendas_Users_ClienteId",
                table: "Vendas",
                column: "ClienteId",
                principalTable: "Users",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Vendas_Users_VendedorId",
                table: "Vendas",
                column: "VendedorId",
                principalTable: "Users",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Users_ClienteId",
                table: "Vendas");

            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Users_VendedorId",
                table: "Vendas");

            migrationBuilder.AddForeignKey(
                name: "FK_Vendas_Users_ClienteId",
                table: "Vendas",
                column: "ClienteId",
                principalTable: "Users",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vendas_Users_VendedorId",
                table: "Vendas",
                column: "VendedorId",
                principalTable: "Users",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
