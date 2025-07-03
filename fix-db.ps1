# ================================
# DATABASE FIX SCRIPT
# File: fix-db.ps1
# ================================

Write-Host "🗄️  FIXING DATABASE SETUP..." -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan

# Check if .env exists
if (!(Test-Path ".env")) {
    Write-Host "❌ .env file not found! Creating one..." -ForegroundColor Red
    
    $envContent = @"
# Database Configuration
DATABASE_URL="file:./dev.db"

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random-$(Get-Random -Maximum 99999)
JWT_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=noreply@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com

# Frontend URL (untuk CORS)
FRONTEND_URL=http://localhost:3000
"@
    
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "✅ Created .env file"
}

# Check Prisma schema
if (!(Test-Path "prisma/schema.prisma")) {
    Write-Host "❌ Prisma schema not found! Creating one..." -ForegroundColor Red
    
    if (!(Test-Path "prisma")) {
        New-Item -ItemType Directory -Path "prisma" -Force | Out-Null
    }
    
    $prismaSchema = @"
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model Contact {
  id          String   @id @default(cuid())
  name        String
  email       String
  subject     String
  message     String
  phone       String?
  company     String?
  country     String   @default("ID")
  
  // System fields
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  status      ContactStatus @default(NEW)
  priority    ContactPriority @default(MEDIUM)
  
  // Additional fields
  tags        String   @default("")
  notes       String?
  assignedTo  String?
  responseAt  DateTime?
  
  // Metadata
  ipAddress   String?
  userAgent   String?

  @@map("contacts")
}

enum ContactStatus {
  NEW
  IN_PROGRESS
  RESPONDED
  CLOSED
  SPAM
}

enum ContactPriority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
"@
    
    $prismaSchema | Out-File -FilePath "prisma/schema.prisma" -Encoding UTF8
    Write-Host "✅ Created Prisma schema"
}

# Remove existing database and client
Write-Host "🧹 Cleaning existing database..." -ForegroundColor Yellow
if (Test-Path "dev.db") {
    Remove-Item "dev.db" -Force
    Write-Host "  ✅ Removed old database"
}

if (Test-Path "node_modules/.prisma") {
    Remove-Item "node_modules/.prisma" -Recurse -Force
    Write-Host "  ✅ Removed old Prisma client"
}

# Install/reinstall Prisma
Write-Host "📦 Installing Prisma..." -ForegroundColor Yellow
try {
    npm install @prisma/client prisma --save
    Write-Host "  ✅ Prisma installed"
} catch {
    Write-Host "  ⚠️  Prisma install may have issues" -ForegroundColor Yellow
}

# Generate Prisma Client
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Yellow
try {
    npx prisma generate
    Write-Host "  ✅ Prisma Client generated"
} catch {
    Write-Host "  ❌ Failed to generate Prisma Client" -ForegroundColor Red
    Write-Host "  💡 Try: npx prisma generate --schema=./prisma/schema.prisma" -ForegroundColor Gray
}

# Create database
Write-Host "🗄️  Creating database..." -ForegroundColor Yellow
try {
    npx prisma db push
    Write-Host "  ✅ Database created and schema pushed"
} catch {
    Write-Host "  ❌ Failed to create database" -ForegroundColor Red
    Write-Host "  💡 Try: npx prisma db push --schema=./prisma/schema.prisma" -ForegroundColor Gray
}

# Verify database file
if (Test-Path "dev.db") {
    $size = (Get-Item "dev.db").Length
    Write-Host "  ✅ Database file created (Size: $size bytes)" -ForegroundColor Green
} else {
    Write-Host "  ❌ Database file not found!" -ForegroundColor Red
}

# Test Prisma connection
Write-Host "🧪 Testing Prisma connection..." -ForegroundColor Yellow
$testScript = @"
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    await prisma.`$connect();
    console.log('✅ Prisma connection successful');
    await prisma.`$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Prisma connection failed:', error.message);
    process.exit(1);
  }
}

test();
"@

$testScript | Out-File -FilePath "test-db.js" -Encoding UTF8

try {
    node test-db.js
    Remove-Item "test-db.js" -Force
    Write-Host "  ✅ Database connection test passed!" -ForegroundColor Green
} catch {
    Write-Host "  ❌ Database connection test failed" -ForegroundColor Red
    Remove-Item "test-db.js" -Force -ErrorAction SilentlyContinue
}

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "🎉 DATABASE FIX COMPLETE!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📁 Files created/updated:" -ForegroundColor Yellow
Write-Host "  • .env (environment variables)"
Write-Host "  • prisma/schema.prisma (database schema)"
Write-Host "  • dev.db (SQLite database file)"
Write-Host "  • node_modules/.prisma/ (generated client)"
Write-Host ""
Write-Host "🚀 Next steps:" -ForegroundColor Yellow
Write-Host "  1. npm run dev        (start server)"
Write-Host "  2. npm run db:studio  (open database GUI)"
Write-Host ""
Write-Host "🔗 If still issues:" -ForegroundColor Gray
Write-Host "  • Check: npx prisma studio"
Write-Host "  • Manual: npx prisma generate && npx prisma db push"
Write-Host "======================================" -ForegroundColor Cyan