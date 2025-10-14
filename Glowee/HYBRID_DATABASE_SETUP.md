# Hybrid Database System - Glowee

## Overview

This project implements an intelligent hybrid system that automatically detects the execution environment and configures the appropriate database:

- **Local Development**: SQLite with automatic database creation
- **Azure Production**: SQL Server with automatic migrations

## Architecture

### Environment Detection
```csharp
// Program.cs - Hybrid configuration
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
```

### Database Initialization Service
```csharp
// DatabaseInitializationService.cs
public async Task InitializeDatabaseAsync()
{
    if (_environment.IsDevelopment())
    {
        await _context.Database.EnsureDeletedAsync();
        await _context.Database.EnsureCreatedAsync();
    }
    else
    {
        await _context.Database.MigrateAsync();
    }
}
```

## Usage

### Local Development
```bash
cd Glowee
dotnet run
```
The SQLite database will be created automatically as `GloweeLocal.db`.

### Azure Production
```bash
export ASPNETCORE_ENVIRONMENT=Production
dotnet run
```
Azure migrations will be applied automatically.

## File Structure

```
Glowee/
├── Migrations/                    # Azure migrations (SQL Server)
├── Migrations/Local/              # Local migrations (SQLite)
├── Services/
│   └── DatabaseInitializationService.cs
├── scripts/
│   ├── setup-local-db.sh         # Linux/Mac script
│   └── setup-local-db.ps1        # Windows script
└── HYBRID_DATABASE_SETUP.md
```

## Configuration

### appsettings.Development.json (Local)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=GloweeLocal.db"
  }
}
```

### appsettings.json (Azure)
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=tcp:sqllucaslab.database.windows.net,1433;Initial Catalog=sqldblab;..."
  }
}
```

## Utility Scripts

### Clean Local Database (Linux/Mac)
```bash
./scripts/setup-local-db.sh
```

### Clean Local Database (Windows)
```powershell
.\scripts\setup-local-db.ps1
```

## Benefits

- **Zero Configuration**: Automatically detects environment
- **No Conflicts**: Separate migrations for each environment
- **Fast Development**: Local SQLite without dependencies
- **Robust Production**: Azure SQL Server with migrations
- **Simple Maintenance**: One command per environment

## Troubleshooting

### Database not created locally
**Solution**: Verify environment is set to `Development`

### Azure connection error
**Solution**: Check credentials in `appsettings.json`

### Migrations not applying
**Solution**: Run `dotnet ef database update` manually

## Test Status

- **Compilation**: Project builds without errors
- **Local Execution**: SQLite created automatically
- **Environment Detection**: Working correctly
- **Hybrid Configuration**: Successfully implemented

## Summary

The hybrid system is working perfectly. You can now:

1. Develop locally with SQLite without conflicts
2. Deploy to Azure with SQL Server automatically
3. Maintain separate migrations for each environment
4. Run with one command in any environment

**Local execution:**
```bash
dotnet run
```

**Azure execution:**
```bash
ASPNETCORE_ENVIRONMENT=Production dotnet run
```
