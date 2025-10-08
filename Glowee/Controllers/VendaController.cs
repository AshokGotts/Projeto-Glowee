using Glowee.AppDbContext;
using Glowee.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Glowee.Controllers
{
    public class VendaController : Controller
    {
        private readonly GloweeDbContext _context;

        public VendaController(GloweeDbContext context)
        {
            _context = context;
        }
        public IActionResult Details(int id)
        {
            var venda = _context.Vendas
                .Include(v => v.Produto)
                .Include(v => v.Vendedor)
                .Include(v => v.Cliente)
                .FirstOrDefault(v => v.VendaId == id);

            if (venda == null)
                return NotFound();

            return View(venda);
        }

        // Não está sendo utilizado
        /*[HttpPost]
        public IActionResult FinalizarCompra(int id)
        {
            var clienteId = HttpContext.Session.GetInt32("UsuarioId");
            var role = HttpContext.Session.GetString("Role");

            if (string.IsNullOrEmpty(role) || role != "Cliente" || clienteId == null)
                return RedirectToAction("Login", "Account");

            var venda = _context.Vendas.FirstOrDefault(v => v.VendaId == id && v.ClienteId == null);
            if (venda != null)
            {
                venda.ClienteId = clienteId.Value;
                _context.SaveChanges();
                Console.WriteLine("Venda finalizada pelo cliente");
            }

            return RedirectToAction("MinhasVendas");
        }*/

        public IActionResult MinhasVendas()
        {
            var vendedorId = HttpContext.Session.GetInt32("UsuarioId");
            var role = HttpContext.Session.GetString("Role");

            Console.WriteLine($"Sessão: VendedorId={vendedorId}, Role={role}");

            if (string.IsNullOrEmpty(role) || role != "Vendedor" || vendedorId == null)
                return RedirectToAction("Login", "Account");

            var vendas = _context.Vendas
                .Where(v => v.VendedorId == vendedorId.Value)
                .Include(v => v.Produto)
                .Include(v => v.Cliente)
                .ToList();

            Console.WriteLine($"Vendas encontradas: {vendas.Count}");

            return View(vendas); // Essa bagaça vai procurar Views/Venda/MinhasVendas.cshtml
        }

    }
}
