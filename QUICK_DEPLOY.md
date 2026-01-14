# Quick Deployment Guide

## 🚀 Deploy to GitHub & Vercel in 5 Steps

### Step 1: Push to GitHub

```bash
# Run the setup script
./GITHUB_SETUP.sh

# Or manually:
git init
git add .
git commit -m "Initial commit: AI Interview Platform"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up Database (Choose One)

#### Option A: PlanetScale (Recommended - Free)
1. Go to https://planetscale.com
2. Sign up → Create database
3. Copy connection string
4. Run `backend/database/schema.sql` in PlanetScale SQL editor

#### Option B: Railway MySQL (Free Tier)
1. Go to https://railway.app
2. New Project → Add MySQL
3. Copy connection details
4. Run schema.sql

### Step 3: Deploy Backend to Railway

1. Go to https://railway.app
2. New Project → Deploy from GitHub
3. Select your repository
4. Settings → Root Directory: `backend`
5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=5000
   DB_HOST=your-db-host
   DB_PORT=3306
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=interview_platform
   FRONTEND_URL=https://your-app.vercel.app
   OPENAI_API_KEY=sk-...
   GEMINI_API_KEY=AIza...
   JWT_SECRET=random-secret-key
   SESSION_SECRET=random-session-secret
   ```
6. Deploy → Copy the URL (e.g., `https://your-app.railway.app`)

### Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com/login
2. Import Project → Select your GitHub repo
3. Configure:
   - **Framework:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend.railway.app/api
   ```
5. Deploy

### Step 5: Update Backend CORS

In Railway dashboard → Your Backend Service → Variables:
Add:
```
FRONTEND_URL=https://your-app.vercel.app
```

Redeploy backend.

## ✅ Done!

Your app is now live at: `https://your-app.vercel.app`

## 🔧 Troubleshooting

**CORS Errors?**
- Check FRONTEND_URL in backend matches your Vercel URL
- Verify REACT_APP_API_URL in Vercel matches backend URL

**Database Errors?**
- Verify database credentials
- Check schema.sql was run
- Test connection from Railway console

**API Not Working?**
- Check backend logs in Railway
- Verify all environment variables are set
- Test backend URL: `https://your-backend.railway.app/api/health`

## 📝 Environment Variables Checklist

### Frontend (Vercel)
- ✅ REACT_APP_API_URL

### Backend (Railway)
- ✅ NODE_ENV=production
- ✅ DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
- ✅ FRONTEND_URL (your Vercel URL)
- ✅ OPENAI_API_KEY
- ✅ GEMINI_API_KEY
- ✅ JWT_SECRET
- ✅ SESSION_SECRET

## 🆘 Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

