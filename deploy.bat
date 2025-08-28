@echo off
title Portfolio Deployment to Vercel

echo 🚀 Starting Portfolio Deployment to Vercel...
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Vercel CLI is not installed!
    echo [INFO] Installing Vercel CLI...
    npm install -g vercel
)

REM Deploy Backend
echo [INFO] Deploying Backend to Vercel...
cd backend-dev

echo [INFO] Building backend...
call npm run build

if %errorlevel% equ 0 (
    echo [SUCCESS] Backend build completed successfully!
    
    echo [INFO] Deploying backend to Vercel...
    call vercel --prod
    
    if %errorlevel% equ 0 (
        echo [SUCCESS] Backend deployed successfully!
    ) else (
        echo [ERROR] Backend deployment failed!
        pause
        exit /b 1
    )
) else (
    echo [ERROR] Backend build failed!
    pause
    exit /b 1
)

cd ..

REM Deploy Frontend
echo [INFO] Deploying Frontend to Vercel...
cd frontend-dev

echo [INFO] Building frontend...
call npm run build

if %errorlevel% equ 0 (
    echo [SUCCESS] Frontend build completed successfully!
    
    echo [INFO] Deploying frontend to Vercel...
    call vercel --prod
    
    if %errorlevel% equ 0 (
        echo [SUCCESS] Frontend deployed successfully!
    ) else (
        echo [ERROR] Frontend deployment failed!
        pause
        exit /b 1
    )
) else (
    echo [ERROR] Frontend build failed!
    pause
    exit /b 1
)

cd ..

echo.
echo [SUCCESS] 🎉 Deployment completed successfully!
echo.
echo 🔧 Next Steps:
echo 1. Update backend CORS_ORIGIN environment variable in Vercel dashboard
echo 2. Update frontend NEXT_PUBLIC_API_URL if needed
echo 3. Test the deployed applications
echo 4. Set up custom domain (optional)
echo.
pause
