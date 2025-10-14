using Glowee.AppDbContext;
using Microsoft.EntityFrameworkCore;

namespace Glowee
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();

            // Configuração híbrida de banco de dados
            builder.Services.AddDbContext<GloweeDbContext>(options =>
            {
                var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

                if (builder.Environment.IsDevelopment())
                {
                    // Desenvolvimento: SQLite local
                    options.UseSqlite(connectionString);
                }
                else
                {
                    // Produção: SQL Server Azure
                    options.UseSqlServer(connectionString);
                }
            });

            builder.Services.AddSession();

            builder.Services.AddSingleton<AzureBlobService>();

            var app = builder.Build();

            app.UseSession();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
