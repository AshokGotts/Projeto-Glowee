using Glowee.AppDbContext;
using Glowee.Services;
using Microsoft.EntityFrameworkCore;

namespace Glowee
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();

            // Hybrid database configuration
            builder.Services.AddDbContext<GloweeDbContext>(options =>
            {
                var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

                if (builder.Environment.IsDevelopment())
                {
                    options.UseSqlite(connectionString, sqliteOptions =>
                    {
                        sqliteOptions.MigrationsAssembly("Glowee.Migrations.Local");
                    });
                }
                else
                {
                    options.UseSqlServer(connectionString, sqlServerOptions =>
                    {
                        sqlServerOptions.MigrationsAssembly("Glowee.Migrations");
                    });
                }
            });

            builder.Services.AddSession();

            builder.Services.AddSingleton<AzureBlobService>();
            builder.Services.AddScoped<DatabaseInitializationService>();

            var app = builder.Build();

            app.UseSession();

            // Initialize database based on environment
            using (var scope = app.Services.CreateScope())
            {
                var dbInitService = scope.ServiceProvider.GetRequiredService<DatabaseInitializationService>();
                await dbInitService.InitializeDatabaseAsync();
            }
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
