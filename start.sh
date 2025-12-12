#!/bin/bash

# AI Interview Platform - Quick Start Script

echo "🚀 Starting AI Interview Preparation Platform..."
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found!"
    echo "📝 Creating .env from template..."
    
    cat > .env << EOF
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

DB_HOST=mysql
DB_PORT=3306
DB_USER=interview_user
DB_PASSWORD=interview_password
DB_NAME=interview_platform

OPENAI_API_KEY=your_openai_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

JWT_SECRET=$(openssl rand -hex 32)
SESSION_SECRET=$(openssl rand -hex 32)
EOF
    
    echo "✅ .env file created!"
    echo "⚠️  IMPORTANT: Please edit .env and add your OpenAI and Gemini API keys!"
    echo ""
    read -p "Press Enter after you've added your API keys..."
fi

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install docker-compose first."
    exit 1
fi

echo "🐳 Starting Docker containers..."
docker-compose up

