# ================================
# ROLLBACK ADMIN SETUP SCRIPT
# File: rollback-admin.ps1
# ================================

Write-Host "🔄 ROLLING BACK ADMIN DASHBOARD SETUP..." -ForegroundColor Red
Write-Host "=======================================" -ForegroundColor Cyan

# Check if we're in frontend directory
if (!(Test-Path "src")) {
    Write-Host "❌ Error: Please run this script from the frontend-dev folder" -ForegroundColor Red
    Write-Host "Expected structure: frontend-dev/src/" -ForegroundColor Gray
    exit 1
}

Write-Host "🗑️  Removing admin dashboard files..." -ForegroundColor Yellow

# List of files to remove (created by setup-admin.ps1)
$filesToRemove = @(
    "src/services/api/httpClient.ts",
    "src/services/api/contactService.ts",
    "src/hooks/useAdminContacts.ts", 
    "src/components/admin/AdminContactsPage.tsx",
    "src/app/admin/contacts/page.tsx"
)

foreach ($file in $filesToRemove) {
    if (Test-Path $file) {
        Remove-Item $file -Force
        Write-Host "  ✅ Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️  Not found: $file" -ForegroundColor Gray
    }
}

# Remove empty directories
Write-Host "🗑️  Removing empty directories..." -ForegroundColor Yellow

$dirsToCheck = @(
    "src/app/admin/contacts",
    "src/app/admin",
    "src/components/admin",
    "src/services/api"
)

foreach ($dir in $dirsToCheck) {
    if (Test-Path $dir) {
        # Check if directory is empty
        $items = Get-ChildItem $dir -Force
        if ($items.Count -eq 0) {
            Remove-Item $dir -Force
            Write-Host "  ✅ Removed empty directory: $dir" -ForegroundColor Green
        } else {
            Write-Host "  ⏭️  Directory not empty: $dir (keeping)" -ForegroundColor Gray
        }
    }
}

# Restore .env.local if it was modified
Write-Host "🔧 Checking .env.local modifications..." -ForegroundColor Yellow

if (Test-Path ".env.local") {
    $envContent = Get-Content ".env.local" -Raw
    
    # Check if we added the API URL
    if ($envContent -match "# Backend API URL\s*\nNEXT_PUBLIC_API_URL=http://localhost:5000") {
        Write-Host "  🔄 Removing added API URL from .env.local..." -ForegroundColor Yellow
        
        # Remove the lines we added
        $cleanedContent = $envContent -replace "`n# Backend API URL\s*\nNEXT_PUBLIC_API_URL=http://localhost:5000", ""
        $cleanedContent = $cleanedContent -replace "# Backend API URL\s*\nNEXT_PUBLIC_API_URL=http://localhost:5000", ""
        
        # Remove any trailing newlines we might have added
        $cleanedContent = $cleanedContent.TrimEnd()
        
        $cleanedContent | Out-File -FilePath ".env.local" -Encoding UTF8
        Write-Host "  ✅ Cleaned .env.local" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️  .env.local was not modified by setup script" -ForegroundColor Gray
    }
} else {
    Write-Host "  ⏭️  .env.local not found" -ForegroundColor Gray
}

# Check for any remaining admin-related files
Write-Host "🔍 Checking for any remaining admin files..." -ForegroundColor Yellow

$remainingFiles = @()

# Check for any files with "admin" in the path
$adminFiles = Get-ChildItem -Path "src" -Recurse -File | Where-Object { $_.FullName -like "*admin*" }
if ($adminFiles) {
    Write-Host "  ⚠️  Found remaining admin-related files:" -ForegroundColor Yellow
    foreach ($file in $adminFiles) {
        $relativePath = $file.FullName.Replace($PWD.Path + "\", "")
        Write-Host "    - $relativePath" -ForegroundColor Gray
        $remainingFiles += $relativePath
    }
}

# Check for any API service files
$apiFiles = Get-ChildItem -Path "src" -Recurse -File | Where-Object { $_.Name -like "*contactService*" -or $_.Name -like "*httpClient*" }
if ($apiFiles) {
    Write-Host "  ⚠️  Found remaining API service files:" -ForegroundColor Yellow
    foreach ($file in $apiFiles) {
        $relativePath = $file.FullName.Replace($PWD.Path + "\", "")
        Write-Host "    - $relativePath" -ForegroundColor Gray
        $remainingFiles += $relativePath
    }
}

# Offer to remove remaining files
if ($remainingFiles.Count -gt 0) {
    Write-Host ""
    $response = Read-Host "Do you want to remove these remaining files? (y/N)"
    if ($response -eq "y" -or $response -eq "Y") {
        foreach ($file in $remainingFiles) {
            if (Test-Path $file) {
                Remove-Item $file -Force
                Write-Host "  ✅ Removed: $file" -ForegroundColor Green
            }
        }
    } else {
        Write-Host "  ⏭️  Keeping remaining files" -ForegroundColor Gray
    }
}

# Check package.json for any admin-related dependencies
Write-Host "🔍 Checking package.json for dependencies..." -ForegroundColor Yellow

if (Test-Path "package.json") {
    $packageContent = Get-Content "package.json" | ConvertFrom-Json
    
    # List of dependencies that might have been added
    $suspiciousDeps = @()
    
    if ($packageContent.dependencies) {
        # Check for any new dependencies that might have been added
        # (This is just informational since setup-admin.ps1 didn't add npm packages)
        Write-Host "  ℹ️  No npm dependencies were added by setup script" -ForegroundColor Cyan
    }
} else {
    Write-Host "  ⏭️  package.json not found" -ForegroundColor Gray
}

# Test if TypeScript compilation works
Write-Host "🧪 Testing TypeScript compilation..." -ForegroundColor Yellow
try {
    if (Get-Command npm -ErrorAction SilentlyContinue) {
        $output = npm run type-check 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  ✅ TypeScript compilation successful!" -ForegroundColor Green
        } else {
            Write-Host "  ⚠️  TypeScript compilation still has issues:" -ForegroundColor Yellow
            Write-Host "    This might be unrelated to the admin setup" -ForegroundColor Gray
            # Show first few lines of error
            $output | Select-Object -First 5 | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
        }
    } else {
        Write-Host "  ⚠️  npm not found - skipping TypeScript check" -ForegroundColor Yellow
    }
} catch {
    Write-Host "  ⚠️  Could not run TypeScript check" -ForegroundColor Yellow
}

# Summary of what was removed
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "🔄 ROLLBACK COMPLETE!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 Removed files:" -ForegroundColor Yellow
Write-Host "  • src/services/api/httpClient.ts" -ForegroundColor White
Write-Host "  • src/services/api/contactService.ts" -ForegroundColor White  
Write-Host "  • src/hooks/useAdminContacts.ts" -ForegroundColor White
Write-Host "  • src/components/admin/AdminContactsPage.tsx" -ForegroundColor White
Write-Host "  • src/app/admin/contacts/page.tsx" -ForegroundColor White
Write-Host ""
Write-Host "🗂️  Removed empty directories:" -ForegroundColor Yellow
Write-Host "  • src/app/admin/contacts/" -ForegroundColor White
Write-Host "  • src/app/admin/ (if empty)" -ForegroundColor White
Write-Host "  • src/components/admin/" -ForegroundColor White
Write-Host "  • src/services/api/ (if empty)" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Cleaned:" -ForegroundColor Yellow
Write-Host "  • .env.local (removed NEXT_PUBLIC_API_URL if added)" -ForegroundColor White
Write-Host ""
Write-Host "✅ Your project should now be back to the state before running setup-admin.ps1" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "  1. Run 'npm run dev' to test your frontend" -ForegroundColor White
Write-Host "  2. Check if everything works as expected" -ForegroundColor White
Write-Host "  3. If you want to try again, we can setup admin manually step by step" -ForegroundColor White
Write-Host ""
Write-Host "💡 If you still have errors:" -ForegroundColor Yellow
Write-Host "  • Run: npm run type-check" -ForegroundColor White
Write-Host "  • Check: npm run lint" -ForegroundColor White
Write-Host "  • Clear cache: rm -rf .next && npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan

# Final check - list current directory structure
Write-Host "📋 Current src/ structure:" -ForegroundColor Cyan
if (Test-Path "src") {
    Get-ChildItem -Path "src" -Directory -Recurse | ForEach-Object {
        $relativePath = $_.FullName.Replace($PWD.Path + "\src\", "")
        Write-Host "  📁 $relativePath" -ForegroundColor Gray
    }
} else {
    Write-Host "  ❌ src/ directory not found!" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔄 Rollback completed successfully!" -ForegroundColor Green