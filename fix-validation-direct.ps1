# ================================
# DIRECT VALIDATION SERVICE FIX
# File: fix-validation-direct.ps1
# ================================

Write-Host "🔧 DIRECT FIX FOR VALIDATION SERVICE..." -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan

# Check if file exists
if (!(Test-Path "src/services/ValidationService.ts")) {
    Write-Host "❌ ValidationService.ts not found!" -ForegroundColor Red
    exit 1
}

# Read current content
Write-Host "📖 Reading current ValidationService.ts..." -ForegroundColor Yellow
$content = Get-Content "src/services/ValidationService.ts" -Raw

# Show problematic line
Write-Host "🔍 Looking for line 76..." -ForegroundColor Yellow
$lines = Get-Content "src/services/ValidationService.ts"
if ($lines.Length -ge 76) {
    Write-Host "  Line 76: $($lines[75])" -ForegroundColor Red
}

# Show lines around 76 for context
Write-Host "📄 Context around line 76:" -ForegroundColor Yellow
for ($i = 73; $i -lt [Math]::Min(79, $lines.Length); $i++) {
    $lineNum = $i + 1
    $prefix = if ($lineNum -eq 76) { "❌ " } else { "   " }
    Write-Host "$prefix Line $lineNum`: $($lines[$i])" -ForegroundColor $(if ($lineNum -eq 76) { "Red" } else { "Gray" })
}

# Multiple fix attempts
Write-Host "🔧 Applying multiple fixes..." -ForegroundColor Yellow

# Fix 1: Template literal without backticks
$content = $content -replace '\$\{data\.subject\}', '(data.subject + " " + data.message)'

# Fix 2: Template literal fragments
$content = $content -replace '\$\{([^}]+)\}([^`]*\.toLowerCase\(\))', '($1 + " " + data.message)$2'

# Fix 3: Broken template literals
$content = $content -replace '\$\{data\.subject\}\s*\+\s*\$\{data\.message\}', '(data.subject + " " + data.message)'

# Fix 4: Template literal with spaces
$content = $content -replace '\$\{data\.subject\}\s+\.toLowerCase\(\)', '(data.subject + " " + data.message).toLowerCase()'

# Fix 5: Any remaining ${...} patterns in this file
$content = $content -replace '\$\{([^}]+)\}', '$1'

# Create completely new clean ValidationService content
Write-Host "📝 Creating clean ValidationService content..." -ForegroundColor Yellow
$cleanContent = @"
export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export class ValidationService {
  private readonly emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  validateContactForm(data: any): ValidationResult {
    const errors: Record<string, string> = {};

    if (!data.name?.trim()) {
      errors.name = 'Name is required';
    } else if (data.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    } else if (data.name.trim().length > 100) {
      errors.name = 'Name must be less than 100 characters';
    }

    if (!data.email?.trim()) {
      errors.email = 'Email is required';
    } else if (!this.validateEmail(data.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!data.subject?.trim()) {
      errors.subject = 'Subject is required';
    } else if (data.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    } else if (data.subject.trim().length > 200) {
      errors.subject = 'Subject must be less than 200 characters';
    }

    if (!data.message?.trim()) {
      errors.message = 'Message is required';
    } else if (data.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (data.message.trim().length > 5000) {
      errors.message = 'Message must be less than 5000 characters';
    }

    if (data.phone && !this.validatePhone(data.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (data.company && data.company.length > 100) {
      errors.company = 'Company name must be less than 100 characters';
    }

    if (this.isSpamContent(data)) {
      errors.message = 'Message flagged as potential spam';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  private validateEmail(email: string): boolean {
    return this.emailRegex.test(email.trim());
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
    return phoneRegex.test(phone.trim());
  }

  private isSpamContent(data: any): boolean {
    const spamKeywords = [
      'viagra', 'casino', 'lottery', 'free money', 'click here',
      'urgent business', 'inheritance', 'lottery winner', 'prince',
      'millions of dollars', 'western union', 'transfer funds'
    ];

    const text = (data.subject + ' ' + data.message).toLowerCase();
    
    const spamScore = spamKeywords.reduce((score, keyword) => {
      return text.includes(keyword) ? score + 1 : score;
    }, 0);

    const caps = text.match(/[A-Z]/g);
    const capsRatio = caps ? caps.length / text.length : 0;
    
    const punctuation = text.match(/[!?]{2,}/g);
    const punctuationCount = punctuation ? punctuation.length : 0;

    return spamScore >= 2 || capsRatio > 0.7 || punctuationCount > 3;
  }
}
"@

# Backup original
Copy-Item "src/services/ValidationService.ts" "src/services/ValidationService.ts.backup" -ErrorAction SilentlyContinue

# Write clean content
$cleanContent | Out-File -FilePath "src/services/ValidationService.ts" -Encoding UTF8
Write-Host "  ✅ Created clean ValidationService.ts"

# Test TypeScript compilation
Write-Host "🧪 Testing TypeScript compilation..." -ForegroundColor Yellow
try {
    $output = npm run type-check 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✅ TypeScript compilation successful!" -ForegroundColor Green
    } else {
        Write-Host "  ❌ TypeScript compilation still has errors:" -ForegroundColor Red
        $output | Select-Object -First 10 | ForEach-Object { 
            Write-Host "    $_" -ForegroundColor Red 
        }
        
        # Show the problematic lines again
        Write-Host "`n📄 Checking line 76 again..." -ForegroundColor Yellow
        $newLines = Get-Content "src/services/ValidationService.ts"
        if ($newLines.Length -ge 76) {
            Write-Host "  Line 76: $($newLines[75])" -ForegroundColor Gray
        } else {
            Write-Host "  ✅ File now has only $($newLines.Length) lines" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "  ❌ Error running type-check: $_" -ForegroundColor Red
}

Write-Host "=======================================" -ForegroundColor Cyan
Write-Host "🎯 VALIDATION SERVICE FIX COMPLETE!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 Files:" -ForegroundColor Yellow
Write-Host "  • Original: ValidationService.ts.backup"
Write-Host "  • Fixed: ValidationService.ts"
Write-Host ""
Write-Host "🚀 Next step:" -ForegroundColor Yellow
Write-Host "  npm run type-check    (verify fix)"
Write-Host "  npm run dev          (start server)"
Write-Host ""
Write-Host "=======================================" -ForegroundColor Cyan