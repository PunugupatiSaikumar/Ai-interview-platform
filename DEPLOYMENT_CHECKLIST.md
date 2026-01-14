# 🚀 Deployment Checklist

## ✅ Step 1: Code Pushed to GitHub
- [x] All changes committed
- [x] Code pushed to: https://github.com/PunugupatiSaikumar/Ai-interview-platform.git

---

## 📦 Step 2: Set Up Database

### Option A: Railway MySQL (Easiest)
1. Go to https://railway.app
2. Sign up/Login
3. Click "New Project"
4. Click "Add Service" → "Database" → "MySQL"
5. Wait for MySQL to provision
6. Click on MySQL service → "Connect" tab
7. Copy these values:
   - `MYSQLHOST` → DB_HOST
   - `MYSQLPORT` → DB_PORT (usually 3306)
   - `MYSQLUSER` → DB_USER
   - `MYSQLPASSWORD` → DB_PASSWORD
   - `MYSQLDATABASE` → DB_NAME
8. Click "Query" tab → Run `backend/database/schema.sql` content

### Option B: PlanetScale (Alternative)
1. Go to https://planetscale.com
2. Sign up → Create database
3. Copy connection string
4. Run `backend/database/schema.sql` in SQL editor

---

## 🔧 Step 3: Deploy Backend to Railway

1. **Go to Railway:** https://railway.app
2. **New Project** → **Deploy from GitHub**
3. **Select repository:** `PunugupatiSaikumar/Ai-interview-platform`
4. **Add Service** → Select the repo
5. **Settings** → **Root Directory:** `backend`
6. **Settings** → **Start Command:** `npm start` (or leave default)
7. **Variables** → Add these environment variables:

```env
NODE_ENV=production
PORT=5000

# Database (from Step 2)
DB_HOST=your-mysql-host
DB_PORT=3306
DB_USER=your-mysql-user
DB_PASSWORD=your-mysql-password
DB_NAME=interview_platform

# Frontend URL (will update after Vercel deployment)
FRONTEND_URL=https://your-app.vercel.app

# API Keys
OPENAI_API_KEY=sk-your-openai-key
GEMINI_API_KEY=your-gemini-key

# Security
JWT_SECRET=generate-random-secret-key-here
SESSION_SECRET=generate-random-session-secret-here
```

8. **Deploy** → Wait for deployment
9. **Copy the URL** (e.g., `https://your-app.up.railway.app`)
10. **Redeploy** if needed

---

## 🎨 Step 4: Deploy Frontend to Vercel

1. **Go to Vercel:** https://vercel.com/login
2. **Sign up/Login** with GitHub
3. **Add New Project** → **Import Git Repository**
4. **Select:** `PunugupatiSaikumar/Ai-interview-platform`
5. **Configure Project:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `build` (auto-detected)
6. **Environment Variables:**
   ```
   REACT_APP_API_URL=https://your-backend.railway.app/api
   ```
   (Replace with your actual Railway backend URL)
7. **Deploy** → Wait for deployment
8. **Copy your Vercel URL** (e.g., `https://your-app.vercel.app`)

---

## 🔄 Step 5: Update Backend CORS

1. **Go back to Railway** → Your Backend Service
2. **Variables** → Update:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
   (Use your actual Vercel URL)
3. **Redeploy** backend (Railway auto-redeploys when vars change)

---

## ✅ Step 6: Verify Deployment

### Test Backend:
```bash
curl https://your-backend.railway.app/health
```
Should return: `{"status":"ok",...}`

### Test Frontend:
- Visit: `https://your-app.vercel.app`
- Should load the login page

---

## 🐛 Troubleshooting

### Backend not starting?
- Check Railway logs: Railway → Your Service → Deployments → View Logs
- Verify all environment variables are set
- Check database connection

### Frontend can't connect to backend?
- Verify `REACT_APP_API_URL` in Vercel matches backend URL
- Check CORS settings in backend
- Verify `FRONTEND_URL` in Railway matches Vercel URL

### Database errors?
- Verify database credentials in Railway
- Check if schema.sql was run
- Verify database is accessible from Railway

---

## 📝 Quick Reference

**Your GitHub Repo:**
```
https://github.com/PunugupatiSaikumar/Ai-interview-platform.git
```

**Railway Dashboard:**
```
https://railway.app
```

**Vercel Dashboard:**
```
https://vercel.com
```

---

## 🎉 You're Done!

Once all steps are complete, your app will be live at:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.railway.app`
