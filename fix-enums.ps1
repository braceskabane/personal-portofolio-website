# ================================
# FIX SQLITE ENUMS SCRIPT
# File: fix-enums.ps1
# ================================

Write-Host "🔧 FIXING SQLITE ENUM ISSUE..." -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan

# Clean up existing database and generated files
Write-Host "🧹 Cleaning up..." -ForegroundColor Yellow
if (Test-Path "dev.db") {
    Remove-Item "dev.db" -Force
    Write-Host "  ✅ Removed old database"
}

if (Test-Path "node_modules/.prisma") {
    Remove-Item "node_modules/.prisma" -Recurse -Force
    Write-Host "  ✅ Removed old Prisma client"
}

# Create fixed Prisma schema without enums
Write-Host "📝 Creating SQLite-compatible schema..." -ForegroundColor Yellow
$fixedSchema = @"
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
  
  // Status: NEW, IN_PROGRESS, RESPONDED, CLOSED, SPAM
  status      String   @default("NEW")
  
  // Priority: LOW, MEDIUM, HIGH, URGENT  
  priority    String   @default("MEDIUM")
  
  // Additional fields
  tags        String   @default("")  // JSON string for array tags
  notes       String?
  assignedTo  String?
  responseAt  DateTime?
  
  // Metadata
  ipAddress   String?
  userAgent   String?

  @@map("contacts")
}
"@

$fixedSchema | Out-File -FilePath "prisma/schema.prisma" -Encoding UTF8
Write-Host "  ✅ Updated Prisma schema"

# Update contact types
Write-Host "📝 Updating TypeScript types..." -ForegroundColor Yellow
$updatedTypes = @"
// ================================
// UPDATED CONTACT TYPES - STRING LITERALS
// ================================

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone: string;
  company: string;
  country: string;
}

export interface Contact extends ContactFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  status: ContactStatus;
  priority: ContactPriority;
  tags: string[];
  notes: string;
  assignedTo?: string;
  responseAt?: Date;
  ipAddress?: string;
  userAgent?: string;
}

// Use string literal types instead of enums for SQLite compatibility
export type ContactStatus = 'NEW' | 'IN_PROGRESS' | 'RESPONDED' | 'CLOSED' | 'SPAM';

export type ContactPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

// Constants for easy usage
export const ContactStatusValues = {
  NEW: 'NEW' as ContactStatus,
  IN_PROGRESS: 'IN_PROGRESS' as ContactStatus,
  RESPONDED: 'RESPONDED' as ContactStatus,
  CLOSED: 'CLOSED' as ContactStatus,
  SPAM: 'SPAM' as ContactStatus
} as const;

export const ContactPriorityValues = {
  LOW: 'LOW' as ContactPriority,
  MEDIUM: 'MEDIUM' as ContactPriority,
  HIGH: 'HIGH' as ContactPriority,
  URGENT: 'URGENT' as ContactPriority
} as const;

export interface ContactFilters {
  status?: ContactStatus;
  priority?: ContactPriority;
  country?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface ContactResponse {
  contacts: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ContactStats {
  total: number;
  byStatus: Record<ContactStatus, number>;
  byPriority: Record<ContactPriority, number>;
  byCountry: Record<string, number>;
  recentContacts: number;
  avgResponseTime: number;
}
"@

$updatedTypes | Out-File -FilePath "src/types/contact.types.ts" -Encoding UTF8
Write-Host "  ✅ Updated TypeScript types"

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
try {
    npx prisma generate
    Write-Host "  ✅ Prisma client generated successfully!"
} catch {
    Write-Host "  ❌ Failed to generate Prisma client" -ForegroundColor Red
    exit 1
}

# Create database
Write-Host "🗄️  Creating database..." -ForegroundColor Yellow
try {
    npx prisma db push
    Write-Host "  ✅ Database created successfully!"
} catch {
    Write-Host "  ❌ Failed to create database" -ForegroundColor Red
    exit 1
}

# Verify database
if (Test-Path "dev.db") {
    $size = (Get-Item "dev.db").Length
    Write-Host "  ✅ Database file verified (Size: $size bytes)" -ForegroundColor Green
} else {
    Write-Host "  ❌ Database file not found!" -ForegroundColor Red
}

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "🎉 SQLITE ENUM FIX COMPLETE!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Changes made:" -ForegroundColor Yellow
Write-Host "  • Removed enums from Prisma schema"
Write-Host "  • Changed to string fields with defaults"
Write-Host "  • Updated TypeScript types to string literals"
Write-Host "  • Generated new Prisma client"
Write-Host "  • Created SQLite database"
Write-Host ""
Write-Host "🚀 Next step:" -ForegroundColor Yellow
Write-Host "  npm run dev    (start the server)"
Write-Host ""
Write-Host "📊 Database tools:" -ForegroundColor Cyan
Write-Host "  npm run db:studio    (open database GUI)"
Write-Host "====================================" -ForegroundColor Cyan