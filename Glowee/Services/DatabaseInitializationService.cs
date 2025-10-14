using Glowee.AppDbContext;
using Microsoft.EntityFrameworkCore;

namespace Glowee.Services
{
    public class DatabaseInitializationService
    {
        private readonly GloweeDbContext _context;
        private readonly IWebHostEnvironment _environment;

        public DatabaseInitializationService(GloweeDbContext context, IWebHostEnvironment environment)
        {
            _context = context;
            _environment = environment;
        }

        public async Task InitializeDatabaseAsync()
        {
            try
            {
                if (_environment.IsDevelopment())
                {
                    // Development: Recreate SQLite database
                    await _context.Database.EnsureDeletedAsync();
                    await _context.Database.EnsureCreatedAsync();

                    Console.WriteLine("Local SQLite database created successfully.");
                }
                else
                {
                    // Production: Apply Azure migrations
                    await _context.Database.MigrateAsync();

                    Console.WriteLine("Azure migrations applied successfully.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Database initialization error: {ex.Message}");
                throw;
            }
        }
    }
}
