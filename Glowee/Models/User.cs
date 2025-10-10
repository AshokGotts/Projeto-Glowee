using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Glowee.Models
{
    public class User
    {
        [Key]
        public int UsuarioId { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "O e-mail é obrigatório.")]
        [EmailAddress(ErrorMessage = "E-mail inválido.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "A senha é obrigatória.")]
        [DataType(DataType.Password)]
        public string Senha { get; set; }

        [Required(ErrorMessage = "O tipo de usuário é obrigatório.")]
        public string Role { get; set; }

        [ValidateNever] // Para não validar a obrigatoriedade, se não o form vai reclamar
        public ICollection<Produto> Produtos { get; set; }
        [ValidateNever] // Para não validar a obrigatoriedade, se não o form vai reclamar
        public ICollection<Venda> Vendas { get; set; }
    }
}
