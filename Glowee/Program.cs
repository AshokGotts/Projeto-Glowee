using Glowee.AppDbContext;
using Microsoft.EntityFrameworkCore;

namespace Glowee
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();

            builder.Services.AddDbContext<GloweeDbContext>(options =>
            {
                if (builder.Environment.IsDevelopment())
                {
                    options.UseSqlite("Data Source=glowee-dev.db");
                }
                else
                {
                    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
                }
            });

            builder.Services.AddSession();

            builder.Services.AddSingleton<AzureBlobService>();

            var app = builder.Build();

            app.UseSession();

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
