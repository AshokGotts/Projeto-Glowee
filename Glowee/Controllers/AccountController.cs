using Glowee.Models;
using Glowee.AppDbContext;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Linq;

namespace Glowee.Controllers
{
    public class AccountController : Controller
    {
        private readonly GloweeDbContext _context;

        public AccountController(GloweeDbContext context)
        {
            _context = context;
        }

        // GET /Account/Register
        public IActionResult Register() => View();

        // POST /Account/Register
        [HttpPost]
        [HttpPost]
        public IActionResult Register(User user)
        {
            Console.WriteLine("Entrou no método Register");

            if (!ModelState.IsValid)
            {
                Console.WriteLine(" Dados inválidos no formulário.");
                return View(user);
            }

            bool emailExistente = _context.Users.Any(u => u.Email == user.Email);
            if (emailExistente)
            {
                ModelState.AddModelError("Email", "Este e-mail já está cadastrado.");
                Console.WriteLine("E-mail já existe.");
                return View(user);
            }

            if (string.IsNullOrEmpty(user.Role))
            {
                ModelState.AddModelError("Role", "Selecione o tipo de usuário.");
                return View(user);
            }

            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                Console.WriteLine("Usuário salvo com sucesso!");
                return RedirectToAction("Login");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Erro ao salvar usuário: " + ex.Message);
                ModelState.AddModelError("", "Erro ao salvar usuário. Tente novamente.");
                return View(user);
            }
        }

        // GET /Account/Login
        public IActionResult Login() => View();

        // POST /Account/Login
        [HttpPost]
        public IActionResult Login(string email, string senha)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == email && u.Senha == senha);
            if (user != null)
            {
                // ✅ Salva o ID como inteiro, não como string
                HttpContext.Session.SetInt32("UsuarioId", user.UsuarioId);
                HttpContext.Session.SetString("Role", user.Role);

                return RedirectToAction("Index", "Home");
            }

            ViewBag.Error = "Credenciais inválidas";
            return View();
        }

        // GET /Account/Logout
        public IActionResult Logout()
        {
            HttpContext.Session.Clear();
            return RedirectToAction("Login");
        }
    }
}
