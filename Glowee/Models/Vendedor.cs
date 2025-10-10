namespace Glowee.Models
{
    public class Vendedor : User
    {
        public ICollection<Produto> Produtos { get; set; }
        public ICollection<Venda> Vendas { get; set; }
    }
}
