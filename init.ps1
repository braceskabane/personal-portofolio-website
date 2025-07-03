# ================================
# PORTFOLIO BACKEND AUTO SETUP SCRIPT
# File: init.ps1
# ================================

Write-Host "🚀 Portfolio Backend Auto Setup Starting..." -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (!(Test-Path "package.json" -PathType Leaf)) {
    Write-Host "❌ Error: Please run this script from the backend-dev folder" -ForegroundColor Red
    exit 1
}

# Create directory structure
Write-Host "📁 Creating directory structure..." -ForegroundColor Yellow

$directories = @(
    "src",
    "src/controllers",
    "src/services",
    "src/services/interfaces",
    "src/repositories",
    "src/repositories/interfaces", 
    "src/types",
    "src/utils",
    "src/container",
    "src/middleware",
    "prisma"
)

foreach ($dir in $directories) {
    if (!(Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  ✅ Created: $dir"
    } else {
        Write-Host "  ⏭️  Exists: $dir"
    }
}

# Create .env file
Write-Host "🔧 Creating .env file..." -ForegroundColor Yellow
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

# Security
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
"@

if (!(Test-Path ".env")) {
    $envContent | Out-File -FilePath ".env" -Encoding UTF8
    Write-Host "  ✅ Created: .env"
} else {
    Write-Host "  ⏭️  Exists: .env (skipping to preserve existing config)"
}

# Create .gitignore
Write-Host "🔧 Creating .gitignore..." -ForegroundColor Yellow
$gitignoreContent = @"
# Dependencies
node_modules/

# Production build
dist/

# Environment variables
.env
.env.local
.env.production

# Database
dev.db
dev.db-journal
*.sqlite
*.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# VS Code
.vscode/

# MacOS
.DS_Store

# Windows
Thumbs.db

# TypeScript
*.tsbuildinfo

# Prisma
migrations/
"@

$gitignoreContent | Out-File -FilePath ".gitignore" -Encoding UTF8
Write-Host "  ✅ Created: .gitignore"

# Create tsconfig.json
Write-Host "🔧 Creating tsconfig.json..." -ForegroundColor Yellow
$tsconfigContent = @"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"],
      "@/types/*": ["src/types/*"],
      "@/controllers/*": ["src/controllers/*"],
      "@/services/*": ["src/services/*"],
      "@/repositories/*": ["src/repositories/*"],
      "@/utils/*": ["src/utils/*"],
      "@/container/*": ["src/container/*"],
      "@/middleware/*": ["src/middleware/*"]
    }
  },
  "include": [
    "src/**/*",
    "prisma/**/*"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "**/*.test.ts",
    "**/*.spec.ts"
  ],
  "ts-node": {
    "require": ["tsconfig-paths/register"]
  }
}
"@

$tsconfigContent | Out-File -FilePath "tsconfig.json" -Encoding UTF8
Write-Host "  ✅ Created: tsconfig.json"

# Create nodemon.json
Write-Host "🔧 Creating nodemon.json..." -ForegroundColor Yellow
$nodemonContent = @"
{
  "watch": ["src", "prisma"],
  "ext": "ts,json",
  "ignore": ["src/**/*.spec.ts", "src/**/*.test.ts", "dist/**/*"],
  "exec": "ts-node -r tsconfig-paths/register src/index.ts",
  "env": {
    "NODE_ENV": "development"
  }
}
"@

$nodemonContent | Out-File -FilePath "nodemon.json" -Encoding UTF8
Write-Host "  ✅ Created: nodemon.json"

# Update package.json scripts
Write-Host "🔧 Updating package.json scripts..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    $packageJson = Get-Content "package.json" | ConvertFrom-Json
    
    # Update scripts
    $packageJson.scripts = @{
        "dev" = "nodemon --exec ts-node -r tsconfig-paths/register src/index.ts"
        "build" = "tsc"
        "start" = "node -r tsconfig-paths/register dist/index.js"
        "db:generate" = "prisma generate"
        "db:push" = "prisma db push"
        "db:migrate" = "prisma migrate dev"
        "db:studio" = "prisma studio"
        "db:seed" = "ts-node -r tsconfig-paths/register prisma/seed.ts"
        "clean" = "rm -rf dist"
        "type-check" = "tsc --noEmit"
        "test" = "echo 'No tests yet' && exit 0"
    }
    
    # Update metadata
    $packageJson.name = "portfolio-backend"
    $packageJson.description = "Backend API for Portfolio Contact Management"
    $packageJson.main = "dist/index.js"
    $packageJson.keywords = @("portfolio", "backend", "api", "contact-management")
    $packageJson.author = "Muhammad Daffa Fisabilillah"
    $packageJson.license = "MIT"
    
    $packageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "package.json" -Encoding UTF8
    Write-Host "  ✅ Updated: package.json"
}

# Create Prisma schema
Write-Host "🔧 Creating Prisma schema..." -ForegroundColor Yellow
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
  tags        String   @default("")  // JSON string untuk array tags
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
Write-Host "  ✅ Created: prisma/schema.prisma"

# Create Types
Write-Host "🔧 Creating TypeScript types..." -ForegroundColor Yellow

# Contact types
$contactTypes = @"
// ================================
// CONTACT TYPES
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

export enum ContactStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESPONDED = 'RESPONDED',
  CLOSED = 'CLOSED',
  SPAM = 'SPAM'
}

export enum ContactPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  URGENT = 'URGENT'
}

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

$contactTypes | Out-File -FilePath "src/types/contact.types.ts" -Encoding UTF8
Write-Host "  ✅ Created: src/types/contact.types.ts"

# API Response types
$apiTypes = @"
// ================================
// API RESPONSE TYPES
// ================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
"@

$apiTypes | Out-File -FilePath "src/types/api.types.ts" -Encoding UTF8
Write-Host "  ✅ Created: src/types/api.types.ts"

# Create main server file
Write-Host "🔧 Creating main server file..." -ForegroundColor Yellow
$serverContent = @"
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Middleware
app.use(helmet()); // Security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(morgan('combined')); // Logging
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Basic routes
app.get('/', (req, res) => {
  res.json({
    message: 'Portfolio Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    database: 'connected'
  });
});

// API Routes will be added here
// app.use('/api/contacts', contactRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: \`Route not found: \${req.method} \${req.originalUrl}\`
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\\n🛑 Shutting down server...');
  await prisma.\$disconnect();
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Server running on port', PORT);
  console.log('📊 Environment:', process.env.NODE_ENV);
  console.log('🔗 Health check: http://localhost:' + PORT + '/health');
  console.log('🗄️  Database: Connected');
});

export default app;
"@

$serverContent | Out-File -FilePath "src/index.ts" -Encoding UTF8
Write-Host "  ✅ Created: src/index.ts"

# Create basic utils
Write-Host "🔧 Creating utility files..." -ForegroundColor Yellow
$responseUtils = @"
import { Response } from 'express';
import { ApiResponse } from '@/types/api.types';

export class ResponseUtil {
  static success<T>(res: Response, data: T, message?: string): Response {
    return res.status(200).json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    } as ApiResponse<T>);
  }

  static created<T>(res: Response, data: T, message?: string): Response {
    return res.status(201).json({
      success: true,
      data,
      message,
      timestamp: new Date().toISOString()
    } as ApiResponse<T>);
  }

  static error(res: Response, message: string, statusCode: number = 400): Response {
    return res.status(statusCode).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    } as ApiResponse);
  }

  static notFound(res: Response, message: string = 'Resource not found'): Response {
    return this.error(res, message, 404);
  }

  static serverError(res: Response, message: string = 'Internal server error'): Response {
    return this.error(res, message, 500);
  }
}
"@

$responseUtils | Out-File -FilePath "src/utils/response.utils.ts" -Encoding UTF8
Write-Host "  ✅ Created: src/utils/response.utils.ts"

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
Write-Host "This may take a few minutes..." -ForegroundColor Gray

# Install production dependencies
$prodDeps = @(
    "express",
    "cors", 
    "helmet",
    "morgan",
    "dotenv",
    "@prisma/client",
    "prisma",
    "bcryptjs",
    "jsonwebtoken",
    "nodemailer"
)

# Install dev dependencies
$devDeps = @(
    "typescript",
    "@types/node",
    "@types/express",
    "@types/cors",
    "@types/bcryptjs", 
    "@types/jsonwebtoken",
    "@types/nodemailer",
    "ts-node",
    "nodemon",
    "tsconfig-paths"
)

try {
    Write-Host "  📦 Installing production dependencies..."
    npm install $prodDeps 2>$null
    
    Write-Host "  🔧 Installing development dependencies..."
    npm install -D $devDeps 2>$null
    
    Write-Host "  ✅ Dependencies installed successfully!"
} catch {
    Write-Host "  ⚠️  Some dependencies may need manual installation" -ForegroundColor Yellow
}

# Initialize Prisma
Write-Host "🗄️  Initializing database..." -ForegroundColor Yellow
try {
    npx prisma generate 2>$null
    npx prisma db push 2>$null
    Write-Host "  ✅ Database initialized successfully!"
} catch {
    Write-Host "  ⚠️  Database initialization may need manual setup" -ForegroundColor Yellow
}

# Create README
Write-Host "📝 Creating README..." -ForegroundColor Yellow
$readmeContent = @"
# Portfolio Backend API

Backend API untuk sistem manajemen kontak portfolio.

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Setup database
npm run db:generate
npm run db:push

# Start development server
npm run dev
\`\`\`

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build production
- \`npm run start\` - Start production server
- \`npm run db:studio\` - Open database browser
- \`npm run type-check\` - Check TypeScript

## API Endpoints

- \`GET /\` - API Info
- \`GET /health\` - Health check
- \`POST /api/contacts\` - Submit contact (coming soon)

## Environment Variables

Copy \`.env\` and update values:
- \`DATABASE_URL\` - Database connection
- \`JWT_SECRET\` - JWT secret key
- \`SMTP_*\` - Email configuration

## Tech Stack

- Express.js + TypeScript
- Prisma ORM + SQLite
- JWT Authentication
- Nodemailer for emails
"@

$readmeContent | Out-File -FilePath "README.md" -Encoding UTF8
Write-Host "  ✅ Created: README.md"

# Final summary
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "🎉 Backend Auto Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Created Files:" -ForegroundColor Yellow
Write-Host "  ✅ Configuration files (tsconfig.json, .env, etc.)"
Write-Host "  ✅ Prisma schema and types"
Write-Host "  ✅ Main server file (src/index.ts)"
Write-Host "  ✅ Directory structure"
Write-Host "  ✅ Utility files"
Write-Host ""
Write-Host "🚀 Next Steps:" -ForegroundColor Yellow
Write-Host "  1. npm run dev        - Start development server"
Write-Host "  2. npm run db:studio  - Open database browser"
Write-Host "  3. Visit: http://localhost:5000"
Write-Host ""
Write-Host "📖 Documentation: README.md" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan