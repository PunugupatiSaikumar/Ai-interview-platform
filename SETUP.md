# Setup Guide - AI Interview Preparation Platform

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify: `node --version`

2. **Docker & Docker Compose**
   - Download Docker Desktop: https://www.docker.com/products/docker-desktop
   - Verify: `docker --version` and `docker-compose --version`

3. **MySQL** (optional if using Docker)
   - Or use a cloud MySQL instance

4. **API Keys**
   - OpenAI API Key: https://platform.openai.com/api-keys
   - Google Gemini API Key: https://makersuite.google.com/app/apikey

## Step-by-Step Setup

### Step 1: Clone/Navigate to Project Directory

```bash
cd "/Users/punug/Desktop/Ai interview platform"
```

### Step 2: Set Up Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` file and add your API keys:
   ```bash
   # Required: Add your API keys
   OPENAI_API_KEY=your_openai_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   
   # Optional: Change secrets for production
   JWT_SECRET=your_secure_random_string_here
   SESSION_SECRET=your_secure_random_string_here
   ```

### Step 3: Install Dependencies

#### Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### Step 4: Set Up Database

#### Option A: Using Docker (Recommended)
```bash
# Start MySQL container
docker-compose up -d mysql

# Wait for MySQL to be ready (about 30 seconds)
# The schema will be automatically created
```

#### Option B: Using Local MySQL
1. Create a MySQL database:
   ```sql
   CREATE DATABASE interview_platform;
   ```

2. Run the schema:
   ```bash
   mysql -u root -p interview_platform < backend/database/schema.sql
   ```

### Step 5: Run the Application

#### Option A: Using Docker Compose (Recommended - All Services)

```bash
# Start all services (MySQL, Backend, Frontend)
docker-compose up

# Or run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Option B: Run Locally (Development)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Server will run on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
# App will open at http://localhost:3000
```

**Terminal 3 - MySQL (if not using Docker):**
```bash
# Make sure MySQL is running locally
mysql -u root -p
```

### Step 6: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### Step 7: Create Your First Account

1. Navigate to http://localhost:3000
2. Click "Register"
3. Create an account with:
   - Name
   - Email
   - Password (minimum 6 characters)

## Troubleshooting

### Database Connection Issues

If you see database connection errors:

1. **Check MySQL is running:**
   ```bash
   docker ps  # Should show mysql container
   # OR
   mysql -u root -p  # Should connect
   ```

2. **Verify environment variables:**
   ```bash
   cat .env  # Check DB credentials
   ```

3. **Check database exists:**
   ```bash
   docker exec -it interview_mysql mysql -u interview_user -p
   SHOW DATABASES;
   ```

### Port Already in Use

If ports 3000, 5000, or 3306 are already in use:

1. **Change ports in docker-compose.yml** or
2. **Stop the conflicting service**

### API Key Errors

- Ensure API keys are correctly set in `.env`
- Verify keys are valid and have credits/quota
- Check API key permissions

### Frontend Can't Connect to Backend

- Verify backend is running on port 5000
- Check `REACT_APP_API_URL` in frontend/.env (if using local dev)
- Check CORS settings in backend/server.js

## Development Commands

### Backend
```bash
cd backend
npm run dev      # Start with nodemon (auto-reload)
npm start        # Start production server
npm test         # Run tests
```

### Frontend
```bash
cd frontend
npm start        # Start development server
npm run build    # Build for production
npm test         # Run tests
```

### Docker
```bash
docker-compose up          # Start all services
docker-compose up -d       # Start in background
docker-compose down        # Stop all services
docker-compose logs        # View logs
docker-compose restart     # Restart services
docker-compose build       # Rebuild images
```

## Production Deployment

For production deployment:

1. Set `NODE_ENV=production` in `.env`
2. Use secure secrets for JWT_SECRET and SESSION_SECRET
3. Configure proper CORS origins
4. Use a production MySQL database
5. Set up SSL/HTTPS
6. Configure environment variables in your hosting platform
7. Build and deploy Docker images or use the CI/CD pipeline

## Next Steps

1. ✅ Set up environment variables
2. ✅ Install dependencies
3. ✅ Start database
4. ✅ Run application
5. ✅ Create account and start practicing!

For more information, see the main README.md file.

