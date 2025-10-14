#!/bin/bash

# Local SQLite Database Setup Script
# This script should be executed from the Glowee project root directory

echo "Setting up local SQLite database for Glowee project..."

# Verify we are in the correct directory
if [ ! -f "Glowee.csproj" ]; then
    echo "Error: Please execute this script from the Glowee project root directory"
    exit 1
fi

# Remove existing local database if present
if [ -f "GloweeLocal.db" ]; then
    echo "Removing existing local database..."
    rm GloweeLocal.db
fi

# Remove existing local database from wwwroot directory if present
if [ -f "wwwroot/GloweeLocal.db" ]; then
    echo "Removing existing local database from wwwroot directory..."
    rm wwwroot/GloweeLocal.db
fi

echo "Local database cleanup completed successfully."
echo ""
echo "To run the project locally:"
echo "1. Execute: dotnet run"
echo "2. SQLite database will be created automatically on first run"
echo "3. Local migrations will be applied automatically"
echo ""
echo "To run in Azure production:"
echo "1. Set environment variable: ASPNETCORE_ENVIRONMENT=Production"
echo "2. Execute: dotnet run"
echo "3. Production migrations will be applied automatically"
echo ""
echo "Setup completed."
