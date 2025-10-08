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

        // Verifica se há produtos cadastrados para o vendedor
        var possuiProdutos = _context.Produtos.Any(p => p.VendedorId == id);

        if (possuiProdutos)
        {
            TempData["Erro"] = $"Não é possível excluir o vendedor \"{vendedor.Nome}\" pois ele possui produtos cadastrados.";
            return RedirectToAction("Index");
        }

        _context.Users.Remove(vendedor);
        _context.SaveChanges();
        TempData["Sucesso"] = $"Vendedor \"{vendedor.Nome}\" excluído com sucesso.";

        return RedirectToAction("Index");
    }

}
