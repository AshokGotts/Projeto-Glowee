using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Glowee.Migrations
{
    /// <inheritdoc />
    public partial class FixProdutoUserRelation02 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Users_UserUsuarioId",
                table: "Produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Users_VendedorId",
                table: "Produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Vendas_VendaId",
                table: "Produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Users_ClienteId",
                table: "Vendas");

            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Users_VendedorUsuarioId",
                table: "Vendas");

            migrationBuilder.DropIndex(
                name: "IX_Vendas_VendedorUsuarioId",
                table: "Vendas");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_UserUsuarioId",
                table: "Produtos");

            migrationBuilder.DropIndex(
                name: "IX_Produtos_VendaId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "VendedorUsuarioId",
                table: "Vendas");

            migrationBuilder.DropColumn(
                name: "UserUsuarioId",
                table: "Produtos");

            migrationBuilder.DropColumn(
                name: "VendaId",
                table: "Produtos");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Vendas",
                newName: "DataVenda");

            migrationBuilder.RenameColumn(
                name: "Discriminator",
                table: "Users",
                newName: "TipoUsuario");

            migrationBuilder.AddColumn<int>(
                name: "ProdutoId",
                table: "Vendas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "VendedorId",
                table: "Vendas",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Vendas_ProdutoId",
                table: "Vendas",
                column: "ProdutoId");

            migrationBuilder.CreateIndex(
                name: "IX_Vendas_VendedorId",
                table: "Vendas",
                column: "VendedorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Users_VendedorId",
                table: "Produtos",
                column: "VendedorId",
                principalTable: "Users",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Vendas_Produtos_ProdutoId",
                table: "Vendas",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "ProdutoId",
                onDelete: ReferentialAction.Restrict);

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Produtos_Users_VendedorId",
                table: "Produtos");

            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Produtos_ProdutoId",
                table: "Vendas");

            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Users_ClienteId",
                table: "Vendas");

            migrationBuilder.DropForeignKey(
                name: "FK_Vendas_Users_VendedorId",
                table: "Vendas");

            migrationBuilder.DropIndex(
                name: "IX_Vendas_ProdutoId",
                table: "Vendas");

            migrationBuilder.DropIndex(
                name: "IX_Vendas_VendedorId",
                table: "Vendas");

            migrationBuilder.DropColumn(
                name: "ProdutoId",
                table: "Vendas");

            migrationBuilder.DropColumn(
                name: "VendedorId",
                table: "Vendas");

            migrationBuilder.RenameColumn(
                name: "DataVenda",
                table: "Vendas",
                newName: "Data");

            migrationBuilder.RenameColumn(
                name: "TipoUsuario",
                table: "Users",
                newName: "Discriminator");

            migrationBuilder.AddColumn<int>(
                name: "VendedorUsuarioId",
                table: "Vendas",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserUsuarioId",
                table: "Produtos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "VendaId",
                table: "Produtos",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vendas_VendedorUsuarioId",
                table: "Vendas",
                column: "VendedorUsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_UserUsuarioId",
                table: "Produtos",
                column: "UserUsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Produtos_VendaId",
                table: "Produtos",
                column: "VendaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Users_UserUsuarioId",
                table: "Produtos",
                column: "UserUsuarioId",
                principalTable: "Users",
                principalColumn: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Users_VendedorId",
                table: "Produtos",
                column: "VendedorId",
                principalTable: "Users",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Produtos_Vendas_VendaId",
                table: "Produtos",
                column: "VendaId",
                principalTable: "Vendas",
                principalColumn: "VendaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vendas_Users_ClienteId",
                table: "Vendas",
                column: "ClienteId",
                principalTable: "Users",
                principalColumn: "UsuarioId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vendas_Users_VendedorUsuarioId",
                table: "Vendas",
                column: "VendedorUsuarioId",
                principalTable: "Users",
                principalColumn: "UsuarioId");
        }
    }
}
