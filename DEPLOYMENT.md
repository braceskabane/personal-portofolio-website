# 🚀 Deployment Guide - Portfolio to Vercel

This guide will help you deploy both frontend and backend to Vercel.

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI**: Install globally
   ```bash
   npm install -g vercel
   ```
3. **Git Repository**: Push your code to GitHub/GitLab/Bitbucket

## 🔧 Setup Instructions

### 1. Login to Vercel
```bash
vercel login
```

### 2. Backend Deployment

#### A. Prepare Backend
```bash
cd backend-dev
npm install
npm run build
```

#### B. Deploy Backend
```bash
vercel --prod
```

#### C. Set Environment Variables
In Vercel Dashboard → Your Backend Project → Settings → Environment Variables:

```
DATABASE_URL=file:./dev.db
JWT_SECRET=your-super-secret-jwt-key-for-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-frontend-url.vercel.app
NODE_ENV=production
PORT=3001
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. Frontend Deployment

#### A. Update Frontend Environment
Update `frontend-dev/.env.production`:
```
NEXT_PUBLIC_API_URL=https://your-backend-url.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-frontend-url.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=mydaffa2003@gmail.com
```

#### B. Deploy Frontend
```bash
cd frontend-dev
npm install
npm run build
vercel --prod
```

## 🤖 Automated Deployment

### Using Deployment Scripts

#### Windows:
```bash
deploy.bat
```

#### Linux/macOS:
```bash
chmod +x deploy.sh
./deploy.sh
```

## 🔄 Continuous Deployment

### Setup Auto-Deployment from Git

1. **Connect Repository**: In Vercel Dashboard, import your project from Git
2. **Configure Build Settings**:
   
   **Frontend:**
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

   **Backend:**
   - Framework Preset: `Other`
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Environment Variables**: Set up the same environment variables as above

## 🌐 Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update environment variables with new domain

## 🔍 Troubleshooting

### Common Issues:

#### Backend Issues:
- **Database**: Vercel uses read-only filesystem. Consider using PlanetScale or Supabase for production
- **CORS Errors**: Ensure frontend URL is added to CORS_ORIGIN
- **Build Errors**: Make sure all dependencies are in `dependencies`, not `devDependencies`

#### Frontend Issues:
- **API Calls**: Ensure API URL is correctly set in environment variables
- **Environment Variables**: Make sure they start with `NEXT_PUBLIC_` for client-side access
- **Build Errors**: Check TypeScript errors and fix them

### Useful Commands:

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Remove deployment
vercel rm [project-name]

# View project info
vercel inspect [deployment-url]
```

## 📱 Testing Your Deployment

1. **Frontend**: Visit your frontend URL
2. **Backend API**: Test API endpoints:
   ```bash
   curl https://your-backend-url.vercel.app/api/health
   ```
3. **Contact Form**: Test form submission
4. **Cross-Origin**: Ensure frontend can communicate with backend

## 🔐 Security Considerations

1. **Environment Variables**: Never commit sensitive data
2. **CORS**: Set specific origins, not wildcard
3. **Rate Limiting**: Configure appropriate limits
4. **HTTPS**: Vercel provides HTTPS by default
5. **Headers**: Security headers are configured in vercel.json

## 🎯 Production Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Environment variables configured
- [ ] CORS settings updated
- [ ] Contact form working
- [ ] All links and routes working
- [ ] Performance optimization enabled
- [ ] Custom domain configured (if applicable)
- [ ] Analytics setup (if applicable)
- [ ] Error monitoring setup (if applicable)

## 📞 Support

If you encounter issues:
1. Check Vercel logs
2. Review environment variables
3. Test API endpoints separately
4. Check CORS configuration
5. Verify build process locally

---

**Happy Deploying! 🚀**
