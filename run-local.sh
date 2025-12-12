#!/bin/bash

# Run project locally without Docker

echo "🚀 Starting AI Interview Platform (Local Mode)..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env from template..."
    
    cat > .env << EOF
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_USER=interview_user
DB_PASSWORD=interview_password
DB_NAME=interview_platform

OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || echo "change-this-secret-key")
SESSION_SECRET=$(openssl rand -hex 32 2>/dev/null || echo "change-this-session-secret")
EOF
    
    echo "✅ .env file created!"
    echo "⚠️  IMPORTANT: Please edit .env and add your API keys and database credentials!"
    echo ""
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
cd ..

echo ""
echo "✅ Dependencies installed!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure MySQL is running (or use Docker: docker-compose up -d mysql)"
echo "2. Update .env with your API keys and database credentials"
echo "3. Run database schema: mysql -u root -p interview_platform < backend/database/schema.sql"
echo ""
echo "🚀 Starting servers..."
echo ""
echo "Terminal 1 - Backend (http://localhost:5000):"
echo "  cd backend && npm run dev"
echo ""
echo "Terminal 2 - Frontend (http://localhost:3000):"
echo "  cd frontend && npm start"
echo ""

