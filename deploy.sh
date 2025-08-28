#!/bin/bash

# 🚀 Deploy Portfolio to Vercel
echo "🚀 Starting Portfolio Deployment to Vercel..."

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI is not installed!"
    print_status "Installing Vercel CLI..."
    npm install -g vercel
fi

# Deploy Backend
print_status "Deploying Backend to Vercel..."
cd "backend-dev"

# Build the project
print_status "Building backend..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Backend build completed successfully!"
    
    # Deploy to Vercel
    print_status "Deploying backend to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        print_success "Backend deployed successfully!"
        backend_url=$(vercel --scope=your-team-name ls | grep "portfolio-backend" | head -1 | awk '{print $2}')
        print_status "Backend URL: https://$backend_url"
    else
        print_error "Backend deployment failed!"
        exit 1
    fi
else
    print_error "Backend build failed!"
    exit 1
fi

cd ..

# Deploy Frontend
print_status "Deploying Frontend to Vercel..."
cd "frontend-dev"

# Update environment variables with backend URL
if [ ! -z "$backend_url" ]; then
    print_status "Updating frontend environment variables..."
    sed -i "s|NEXT_PUBLIC_API_URL=.*|NEXT_PUBLIC_API_URL=https://$backend_url|" .env.production
fi

# Build the project
print_status "Building frontend..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Frontend build completed successfully!"
    
    # Deploy to Vercel
    print_status "Deploying frontend to Vercel..."
    vercel --prod
    
    if [ $? -eq 0 ]; then
        print_success "Frontend deployed successfully!"
        frontend_url=$(vercel --scope=your-team-name ls | grep "advanced-portfolio" | head -1 | awk '{print $2}')
        print_status "Frontend URL: https://$frontend_url"
    else
        print_error "Frontend deployment failed!"
        exit 1
    fi
else
    print_error "Frontend build failed!"
    exit 1
fi

cd ..

# Final status
print_success "🎉 Deployment completed successfully!"
print_status "Backend URL: https://$backend_url"
print_status "Frontend URL: https://$frontend_url"
print_warning "Don't forget to update CORS settings in backend with the frontend URL!"

echo ""
echo "🔧 Next Steps:"
echo "1. Update backend CORS_ORIGIN environment variable in Vercel dashboard"
echo "2. Update frontend NEXT_PUBLIC_API_URL if needed"
echo "3. Test the deployed applications"
echo "4. Set up custom domain (optional)"
