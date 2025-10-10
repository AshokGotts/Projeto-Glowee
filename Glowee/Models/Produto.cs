using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;

namespace Glowee.Models
{
    public class Produto
    {
        [Key]
        public int ProdutoId { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required]
        public string Descricao { get; set; }

        [Required]
        public string Categoria { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Preco { get; set; }

        public string ImagemUrl { get; set; }

        public int VendedorId { get; set; }

        [ForeignKey("VendedorId")]
        public User Vendedor { get; set; }

        // Adiciona relacionamento com vendas
        public ICollection<Venda> Vendas { get; set; }
        public bool Vendido { get; set; } = false;

    }
}
