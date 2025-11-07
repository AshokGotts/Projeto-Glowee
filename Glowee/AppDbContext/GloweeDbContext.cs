using Glowee.Models;
using Microsoft.EntityFrameworkCore;

namespace Glowee.AppDbContext
{
    public class GloweeDbContext : DbContext
    {
        public GloweeDbContext(DbContextOptions<GloweeDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Venda> Vendas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Herança: Cliente herda de User
            modelBuilder.Entity<User>()
                .HasDiscriminator<string>("TipoUsuario")
                .HasValue<User>("User")
                .HasValue<Cliente>("Cliente");

            // Produto -> Vendedor (User)
            modelBuilder.Entity<Produto>()
                .HasOne(p => p.Vendedor)
                .WithMany(u => u.Produtos)
                .HasForeignKey(p => p.VendedorId)
                .HasPrincipalKey(u => u.UsuarioId)
                // onDelete não funcionou, verificar pra deletar
                .OnDelete(DeleteBehavior.Cascade); // Exclui todos os produtos quando excluir vendedor

            // Venda -> Produto
            modelBuilder.Entity<Venda>()
                .HasOne(v => v.Produto)
                .WithMany(p => p.Vendas)
                .HasForeignKey(v => v.ProdutoId)
                .OnDelete(DeleteBehavior.SetNull); // Permite excluir produto, mantendo venda

            // Venda -> Vendedor
            modelBuilder.Entity<Venda>()
                .HasOne(v => v.Vendedor)
                .WithMany(u => u.Vendas)
                .HasForeignKey(v => v.VendedorId)
                .HasPrincipalKey(u => u.UsuarioId)
                .OnDelete(DeleteBehavior.SetNull);

            // Venda -> Cliente
            modelBuilder.Entity<Venda>()
                .HasOne<User>(v => v.Cliente)
                .WithMany()
                .HasForeignKey(v => v.ClienteId)
                .HasPrincipalKey(u => u.UsuarioId)
                .OnDelete(DeleteBehavior.SetNull);

            base.OnModelCreating(modelBuilder);
        }
    }
}
