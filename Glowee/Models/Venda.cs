using System.ComponentModel.DataAnnotations;
namespace Glowee.Models
{
    public class Venda
    {
        [Key]
        public int VendaId { get; set; }

        public DateTime DataVenda { get; set; }

        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }

        public int? VendedorId { get; set; }
        public User Vendedor { get; set; }

        public int? ClienteId { get; set; }
        public User Cliente { get; set; }

    }

}
