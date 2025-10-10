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

            // Produto → Vendedor (User)
            modelBuilder.Entity<Produto>()
                .HasOne(p => p.Vendedor)
                .WithMany(u => u.Produtos)
                .HasForeignKey(p => p.VendedorId)
                .HasPrincipalKey(u => u.UsuarioId)
                .OnDelete(DeleteBehavior.Restrict); // Impede exclusão se houver produtos

            // Venda → Produto
            modelBuilder.Entity<Venda>()
                .HasOne(v => v.Produto)
                .WithMany(p => p.Vendas)
                .HasForeignKey(v => v.ProdutoId)
                .OnDelete(DeleteBehavior.Restrict); // Protege integridade do produto

            // Venda → Vendedor (User)
            modelBuilder.Entity<Venda>()
                .HasOne(v => v.Vendedor)
                .WithMany(u => u.Vendas)
                .HasForeignKey(v => v.VendedorId)
                .HasPrincipalKey(u => u.UsuarioId)
                .OnDelete(DeleteBehavior.SetNull); // Permite excluir vendedor, mantendo vendas

            // Venda → Cliente (sem navegação reversa)
            modelBuilder.Entity<Venda>()
                .HasOne<User>(v => v.Cliente)
                .WithMany()
                .HasForeignKey(v => v.ClienteId)
                .HasPrincipalKey(u => u.UsuarioId)
                .OnDelete(DeleteBehavior.SetNull); // Permite excluir cliente, mantendo vendas

            base.OnModelCreating(modelBuilder);
        }
    }
}
