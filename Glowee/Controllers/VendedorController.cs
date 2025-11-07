using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Glowee.Models;
using Glowee.AppDbContext;
using Microsoft.EntityFrameworkCore;

public class VendedorController : Controller
{
    private readonly GloweeDbContext _context;

    public VendedorController(GloweeDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        var vendedores = _context.Users
            .Where(u => u.Role == "Vendedor")
            .ToList();

        var vendasPorVendedor = _context.Vendas
            .GroupBy(v => v.VendedorId)
            .ToDictionary(g => g.Key, g => g.Count());

        ViewBag.VendasPorVendedor = vendasPorVendedor;

        return View(vendedores);
    }

    [HttpPost]
    public IActionResult Excluir(int id)
    {
        var vendedor = _context.Users.FirstOrDefault(u => u.UsuarioId == id && u.Role == "Vendedor");

        if (vendedor == null)
        {
            TempData["Erro"] = "Vendedor não encontrado.";
            return RedirectToAction("Index");
        }

        // Impede exclusão do usuário root
        if (vendedor.Nome.Equals("root", StringComparison.OrdinalIgnoreCase))
        {
            TempData["Erro"] = "O usuário root não pode ser excluído.";
            return RedirectToAction("Index");
        }

        // Recupera o ID do usuário logado via sessão
        var usuarioLogadoId = HttpContext.Session.GetInt32("UsuarioId");

        // Impede o vendedor de se autoexcluir, a pegada aqui é o usuário da sessão
        if (usuarioLogadoId.HasValue && vendedor.UsuarioId == usuarioLogadoId.Value)
        {
            TempData["Erro"] = "Você não pode excluir a si mesmo.";
            return RedirectToAction("Index");
        }

        try
        {
            // Remove as vendas e produtos associados pois o onDelete no DbContext não funcionou
            var produtosDoVendedor = _context.Produtos.Where(p => p.VendedorId == id).ToList();

            foreach (var produto in produtosDoVendedor)
            {
                var vendasDoProduto = _context.Vendas.Where(v => v.ProdutoId == produto.ProdutoId).ToList();
                _context.Vendas.RemoveRange(vendasDoProduto);
            }

            _context.Produtos.RemoveRange(produtosDoVendedor);
            _context.Users.Remove(vendedor);

            _context.SaveChanges();
            TempData["Sucesso"] = $"Vendedor \"{vendedor.Nome}\" e seus produtos foram excluídos com sucesso.";
        }
        catch (Exception ex)
        {
            Console.WriteLine("Erro ao excluir vendedor:");
            Console.WriteLine(ex.ToString());
            TempData["Erro"] = $"Erro ao excluir vendedor: {ex.Message}";
        }

        return RedirectToAction("Index");
    }

    [HttpPost]
    public IActionResult CadastrarVendedor(string nome, string email)
    {
        // Impede nome "root" (case-insensitive)
        if (nome.Equals("root", StringComparison.OrdinalIgnoreCase))
        {
            TempData["Erro"] = "O nome 'root' é reservado e não pode ser usado.";
            return RedirectToAction("Index");
        }

        // Verifica se o e-mail já está cadastrado
        if (_context.Users.Any(u => u.Email == email))
        {
            TempData["Erro"] = "Este e-mail já está em uso.";
            return RedirectToAction("Index");
        }

        try
        {
            // Gera senha aleatória segura
            var senhaGerada = Guid.NewGuid().ToString("N")[..8];

            var novoVendedor = new User
            {
                Nome = nome,
                Email = email,
                Senha = senhaGerada,
                Role = "Vendedor"
            };

            _context.Users.Add(novoVendedor);
            _context.SaveChanges();

            TempData["Sucesso"] = $"Vendedor '{nome}' cadastrado com sucesso! Senha: {senhaGerada}";
        }
        catch (Exception ex)
        {
            TempData["Erro"] = $"Erro ao cadastrar vendedor: {ex.Message}";
        }

        return RedirectToAction("Index");
    }
}
