# Local SQLite Database Setup Script
# This script should be executed from the Glowee project root directory

Write-Host "Setting up local SQLite database for Glowee project..." -ForegroundColor Green

# Verify we are in the correct directory
if (-not (Test-Path "Glowee.csproj")) {
    Write-Host "Error: Please execute this script from the Glowee project root directory" -ForegroundColor Red
    exit 1
}

# Remove existing local database if present
if (Test-Path "GloweeLocal.db") {
    Write-Host "Removing existing local database..." -ForegroundColor Yellow
    Remove-Item "GloweeLocal.db" -Force
}

# Remove existing local database from wwwroot directory if present
if (Test-Path "wwwroot/GloweeLocal.db") {
    Write-Host "Removing existing local database from wwwroot directory..." -ForegroundColor Yellow
    Remove-Item "wwwroot/GloweeLocal.db" -Force
}

Write-Host "Local database cleanup completed successfully." -ForegroundColor Green
Write-Host ""
Write-Host "To run the project locally:" -ForegroundColor Cyan
Write-Host "1. Execute: dotnet run" -ForegroundColor White
Write-Host "2. SQLite database will be created automatically on first run" -ForegroundColor White
Write-Host "3. Local migrations will be applied automatically" -ForegroundColor White
Write-Host ""
Write-Host "To run in Azure production:" -ForegroundColor Cyan
Write-Host "1. Set environment variable: ASPNETCORE_ENVIRONMENT=Production" -ForegroundColor White
Write-Host "2. Execute: dotnet run" -ForegroundColor White
Write-Host "3. Production migrations will be applied automatically" -ForegroundColor White
Write-Host ""
Write-Host "Setup completed." -ForegroundColor Green
