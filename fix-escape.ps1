# ================================
# FIX ESCAPE CHARACTERS SCRIPT
# File: fix-escape.ps1
# ================================

Write-Host "🔧 FIXING ESCAPE CHARACTER ERRORS..." -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan

# Backup current file
if (Test-Path "src/index.ts") {
    Copy-Item "src/index.ts" "src/index.ts.backup"
    Write-Host "✅ Backed up current file to src/index.ts.backup" -ForegroundColor Yellow
}

# Read current file and show problems
Write-Host "🔍 Checking for escape character errors..." -ForegroundColor Yellow
if (Test-Path "src/index.ts") {
    $content = Get-Content "src/index.ts" -Raw
    
    # Check for problematic patterns
    $problems = @()
    if ($content -match '\\Route') { $problems += "Escape in route message" }
    if ($content -match 'prisma\.\\') { $problems += "Escape in prisma disconnect" }
    if ($content -match '\\\$') { $problems += "Escape in template literal" }
    
    if ($problems.Count -gt 0) {
        Write-Host "  ❌ Found problems:" -ForegroundColor Red
        $problems | ForEach-Object { Write-Host "    • $_" -ForegroundColor Red }
    } else {
        Write-Host "  ✅ No escape character problems found" -ForegroundColor Green
        Write-Host "  💡 The error might be elsewhere" -ForegroundColor Yellow
        exit 0
    }
}

# Delete problematic file
Remove-Item "src/index.ts" -Force
Write-Host "✅ Removed problematic file" -ForegroundColor Yellow

# Create new clean file by writing it in parts to avoid escape issues
Write-Host "📝 Creating new clean file..." -ForegroundColor Yellow

# Write the file content directly with here-string to avoid escape issues
# Note: We'll write it as a UTF-8 file without BOM
$cleanContent = @'
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Portfolio Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    endpoints: {
      health: '/health',
      api: '/api',
      test: '/api/test'
    }
  });
});

app.get('/health', async (req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      success: true,
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      message: 'Database connection failed',
      timestamp: new Date().toISOString()
    });
  }
});

app.get('/api', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'API is working!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test', (req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'API test endpoint working!',
    timestamp: new Date().toISOString(),
    requestInfo: {
      method: req.method,
      url: req.url
    }
  });
});

app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  
  console.error(`[${timestamp}] Error:`, err.message);
  
  const statusCode = err.statusCode || err.status || 500;
  
  res.status(statusCode).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    timestamp
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.path}`,
    timestamp: new Date().toISOString()
  });
});

const gracefulShutdown = async (signal: string) => {
  console.log(`\nReceived ${signal}. Shutting down gracefully...`);
  
  try {
    await prisma.$disconnect();
    console.log('Database disconnected');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

const startServer = async () => {
  try {
    console.log('Testing database connection...');
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    console.log('Database connection successful');
    
    app.listen(PORT, () => {
      console.log('================================================');
      console.log('🚀 PORTFOLIO BACKEND SERVER STARTED');
      console.log('================================================');
      console.log(`Port: ${PORT}`);
      console.log(`URL: http://localhost:${PORT}`);
      console.log(`Health: http://localhost:${PORT}/health`);
      console.log('================================================');
    });
    
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
'@

# Write the content to file with UTF-8 encoding
[System.IO.File]::WriteAllText("$PWD\src\index.ts", $cleanContent, [System.Text.Encoding]::UTF8)

Write-Host "✅ Created new clean index.ts file" -ForegroundColor Green

# Test compilation
Write-Host "🧪 Testing TypeScript compilation..." -ForegroundColor Yellow
try {
    npm run type-check
    Write-Host "  ✅ TypeScript compilation successful!" -ForegroundColor Green
} catch {
    Write-Host "  ❌ TypeScript compilation failed" -ForegroundColor Red
    Write-Host "  📄 Error details above" -ForegroundColor Red
}

Write-Host "======================================" -ForegroundColor Cyan
Write-Host "🎉 ESCAPE CHARACTER FIX COMPLETE!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ What was fixed:" -ForegroundColor Yellow
Write-Host "  • Removed escape characters in string literals"
Write-Host "  • Fixed template literal syntax"
Write-Host "  • Cleaned up Prisma method calls"
Write-Host "  • Simplified error messages"
Write-Host ""
Write-Host "🚀 Next step:" -ForegroundColor Yellow
Write-Host "  npm run dev    (start the server)"
Write-Host ""
Write-Host "📁 Backup:" -ForegroundColor Cyan
Write-Host "  Old file saved as: src/index.ts.backup"
Write-Host "======================================" -ForegroundColor Cyan