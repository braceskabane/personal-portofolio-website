# 🚀 Setup Continuous Deployment dari GitHub ke Vercel

## 📋 Langkah-langkah Detail:

### 1. **Login ke Vercel Dashboard**
- Buka [vercel.com](https://vercel.com)
- Login dengan akun Anda

### 2. **Import Project dari GitHub**

#### A. **Untuk Frontend:**
1. Klik "New Project" atau "Add New..." → "Project"
2. Pilih "Import Git Repository"
3. Authorize GitHub jika belum
4. Pilih repository: `braceskabane/personal-portofolio-website`
5. **Root Directory**: Pilih `frontend-dev`
6. **Framework Preset**: Next.js
7. **Build Settings**:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - Development Command: `npm run dev`

#### B. **Environment Variables untuk Frontend:**
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://dav-portfolio-5zz1ntdof-braceskabanes-projects.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-new-frontend-url.vercel.app
NEXT_PUBLIC_CONTACT_EMAIL=mydaffa2003@gmail.com
NEXT_PUBLIC_ENABLE_CONTACT_FORM=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false
```

#### C. **Untuk Backend:**
1. Klik "New Project" lagi
2. Pilih "Import Git Repository"
3. Pilih repository: `braceskabane/personal-portofolio-website`
4. **Root Directory**: Pilih `backend-dev`
5. **Framework Preset**: Other
6. **Build Settings**:
   - Build Command: `npm run vercel-build`
   - Output Directory: `dist`
   - Install Command: `npm install`

#### D. **Environment Variables untuk Backend:**
```
NODE_ENV=production
DATABASE_URL=file:./dev.db
JWT_SECRET=your-super-secret-jwt-key-for-production
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://your-new-frontend-url.vercel.app
PORT=3001
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 3. **Deploy Projects**
- Deploy Frontend terlebih dahulu
- Catat URL frontend yang dihasilkan
- Update `CORS_ORIGIN` di environment variables backend dengan URL frontend
- Deploy Backend

### 4. **Update Environment Variables**
Setelah kedua project deployed:
1. Update `NEXT_PUBLIC_API_URL` di frontend dengan URL backend baru
2. Update `CORS_ORIGIN` di backend dengan URL frontend baru
3. Re-deploy kedua project

### 5. **Setup Auto-Deploy**
Vercel akan otomatis deploy setiap kali ada push ke branch `frontend-dev-v2`:
- Frontend akan auto-deploy dari folder `frontend-dev`
- Backend akan auto-deploy dari folder `backend-dev`

## 🔄 **Auto-Deploy Behavior:**
- **Push ke `frontend-dev-v2`** → Auto deploy frontend & backend
- **Merge ke main** → Bisa setup production deployment
- **Pull Request** → Deploy preview

## ⚙️ **Project Names yang Disarankan:**
- Frontend: `daffa-portfolio-frontend`
- Backend: `daffa-portfolio-backend`

## 🌐 **Hasil Akhir:**
- Frontend URL: `https://daffa-portfolio-frontend.vercel.app`
- Backend URL: `https://daffa-portfolio-backend.vercel.app`
- Auto-deploy dari GitHub ✅
- Environment variables terpisah ✅
- Continuous deployment ✅

## 🔧 **Troubleshooting:**
1. Jika build gagal, cek logs di Vercel dashboard
2. Pastikan Root Directory benar (`frontend-dev` dan `backend-dev`)
3. Pastikan Environment Variables sudah diset
4. Test API connectivity setelah deployment

---
**💡 Tips**: Setelah setup, Anda bisa hapus deployment lama yang dibuat via CLI dan gunakan yang dari GitHub untuk continuous deployment.
