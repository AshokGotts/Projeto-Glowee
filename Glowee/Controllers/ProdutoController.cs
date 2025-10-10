using Azure.Storage.Blobs;
using Glowee.AppDbContext;
using Glowee.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Glowee.Controllers
{
    public class ProdutoController : Controller
    {
        private readonly GloweeDbContext _context;
        private readonly IConfiguration _config;

        public ProdutoController(GloweeDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // Exibe apenas produtos disponíveis
        public IActionResult Index(string ordenarPor)
        {
            var produtos = _context.Produtos
                .Where(p => !p.Vendido)
                .Include(p => p.Vendedor)
                .AsQueryable();

            switch (ordenarPor)
            {
                case "precoAsc":
                    produtos = produtos.OrderBy(p => p.Preco);
                    break;
                case "precoDesc":
                    produtos = produtos.OrderByDescending(p => p.Preco);
                    break;
                case "nome":
                    produtos = produtos.OrderBy(p => p.Nome);
                    break;
                case "recentes":
                    produtos = produtos.OrderByDescending(p => p.ProdutoId);
                    break;
            }

            return View(produtos.ToList());
        }


        public IActionResult Create()
        {
            var role = HttpContext.Session.GetString("Role");
            if (string.IsNullOrEmpty(role) || role != "Vendedor")
                return RedirectToAction("Login", "Account");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Produto produto, IFormFile Imagem)
        {
            var role = HttpContext.Session.GetString("Role");
            var vendedorId = HttpContext.Session.GetInt32("UsuarioId");

            if (string.IsNullOrEmpty(role) || role != "Vendedor" || vendedorId == null)
                return RedirectToAction("Login", "Account");

            if (Imagem == null || Imagem.Length == 0)
            {
                ModelState.AddModelError("ImagemUrl", "A imagem do produto é obrigatória.");
                return View(produto);
            }

            // Upload para Azure Blob Storage
            var connectionString = _config["AzureStorage:ConnectionString"];
            var containerName = _config["AzureStorage:ContainerName"];

            var blobContainer = new BlobContainerClient(connectionString, containerName);
            await blobContainer.CreateIfNotExistsAsync();

            var blobName = Guid.NewGuid().ToString() + Path.GetExtension(Imagem.FileName);
            var blobClient = blobContainer.GetBlobClient(blobName);

            using (var stream = Imagem.OpenReadStream())
            {
                await blobClient.UploadAsync(stream, true);
            }

            produto.ImagemUrl = blobClient.Uri.ToString();
            produto.VendedorId = vendedorId.Value;

            ModelState.Remove(nameof(produto.Vendas));
            ModelState.Remove(nameof(produto.Vendedor));
            ModelState.Remove(nameof(produto.ImagemUrl));

            if (!ModelState.IsValid)
            {
                foreach (var error in ModelState.Values.SelectMany(v => v.Errors))
                {
                    Console.WriteLine("Erro de validação: " + error.ErrorMessage);
                }
                return View(produto);
            }

            try
            {
                _context.Produtos.Add(produto);
                await _context.SaveChangesAsync();
                Console.WriteLine("Produto salvo com sucesso!");
                return RedirectToAction("Index");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro ao salvar produto: " + ex.Message);
                ModelState.AddModelError("", "Erro ao salvar produto: " + ex.Message);
                return View(produto);
            }
        }

        // Excluir produto sem registrar venda
        [HttpPost]
        public IActionResult Delete(int id)
        {
            var role = HttpContext.Session.GetString("Role");
            var vendedorId = HttpContext.Session.GetInt32("UsuarioId");

            if (string.IsNullOrEmpty(role) || role != "Vendedor" || vendedorId == null)
                return RedirectToAction("Login", "Account");

            var produto = _context.Produtos.FirstOrDefault(p => p.ProdutoId == id && p.VendedorId == vendedorId.Value);
            if (produto != null)
            {
                _context.Produtos.Remove(produto);
                _context.SaveChanges();
                Console.WriteLine("Produto deletado sem registrar venda");
            }

            return RedirectToAction("Index");
        }

        // Marcar como vendido e registrar venda
        [HttpPost]
        public IActionResult MarcarComoVendido(int id)
        {
            var vendedorId = HttpContext.Session.GetInt32("UsuarioId");
            var role = HttpContext.Session.GetString("Role");

            Console.WriteLine($"Tentando marcar como vendido: ProdutoId={id}, VendedorId={vendedorId}, Role={role}");

            if (string.IsNullOrEmpty(role) || role != "Vendedor" || vendedorId == null)
            {
                Console.WriteLine("Sessão inválida ou usuário não é vendedor");
                return RedirectToAction("Login", "Account");
            }

            var produto = _context.Produtos.FirstOrDefault(p => p.ProdutoId == id);

            if (produto == null)
            {
                Console.WriteLine("Produto não encontrado");
                TempData["Erro"] = "Produto não encontrado.";
                return RedirectToAction("Buscar");
            }

            if (produto.VendedorId != vendedorId.Value)
            {
                Console.WriteLine("Produto pertence a outro vendedor");
                TempData["Erro"] = "PRODUTO PERTENCE A OUTRO VENDEDOR";
                return RedirectToAction("Buscar");
            }

            if (produto.Vendido)
            {
                Console.WriteLine("Produto já está marcado como vendido");
                TempData["Erro"] = "Produto já foi vendido.";
                return RedirectToAction("Buscar");
            }

            try
            {
                produto.Vendido = true;

                var venda = new Venda
                {
                    ProdutoId = produto.ProdutoId,
                    VendedorId = vendedorId.Value,
                    DataVenda = DateTime.Now,
                    ClienteId = null
                };

                _context.Vendas.Add(venda);
                _context.SaveChanges();

                Console.WriteLine("Produto marcado como vendido e venda registrada");
                TempData["Sucesso"] = "Produto marcado como vendido!";
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro ao registrar venda: " + ex.Message);
                TempData["Erro"] = "Erro ao registrar venda. Tente novamente.";
            }

            return RedirectToAction("Buscar");
        }

        public IActionResult Buscar(string termo, string categoria, decimal? precoMin, decimal? precoMax)
        {
            var produtos = _context.Produtos
                .Where(p => !p.Vendido)
                .Include(p => p.Vendedor)
                .AsQueryable();

            if (!string.IsNullOrEmpty(termo))
                produtos = produtos.Where(p => p.Nome.Contains(termo) || p.Descricao.Contains(termo));

            if (!string.IsNullOrEmpty(categoria))
                produtos = produtos.Where(p => p.Categoria == categoria);

            if (precoMin.HasValue)
                produtos = produtos.Where(p => p.Preco >= precoMin.Value);

            if (precoMax.HasValue)
                produtos = produtos.Where(p => p.Preco <= precoMax.Value);

            return View(produtos.ToList());
        }
    }
}
