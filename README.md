# AI-Powered Interview Preparation Platform

A full-stack interview preparation platform where users can practice coding and behavioral questions through an AI-driven chat interface.

## Features

- 🤖 AI-driven chat interface for coding and behavioral questions
- 🔄 Integration with OpenAI and Gemini APIs
- 📊 User history and score tracking with MySQL
- 🐳 Docker containerization for easy deployment
- 🚀 CI/CD pipeline for automated testing and deployment
- 📈 Personalized question selection based on user performance

## Tech Stack

### Backend
- Node.js with Express.js
- MySQL database
- OpenAI API
- Google Gemini API

### Frontend
- React.js
- Modern UI/UX

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)

## Project Structure

```
.
├── backend/          # Express.js API server
├── frontend/         # React application
├── docker/           # Docker configurations
├── .github/          # CI/CD workflows
└── docs/             # Documentation
```

## Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose (for local development)
- MySQL (or use cloud MySQL like PlanetScale)
- OpenAI API key
- Google Gemini API key

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-interview-platform.git
   cd ai-interview-platform
   ```

2. Copy `.env.example` to `.env` and fill in your API keys
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

3. Run with Docker:
   ```bash
   docker-compose up
   ```

4. Or run locally:
   ```bash
   ./run-local.sh
   ```

5. Access the application at `http://localhost:3000`

### Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions on deploying to:
- **Frontend:** Vercel
- **Backend:** Railway or Render
- **Database:** PlanetScale, Railway MySQL, or AWS RDS

Quick deployment steps:
1. Push code to GitHub
2. Deploy frontend to Vercel
3. Deploy backend to Railway/Render
4. Set up MySQL database (PlanetScale recommended)
5. Configure environment variables

## Environment Variables

See `.env.example` for required environment variables.

## Development

- Backend: `cd backend && npm run dev`
- Frontend: `cd frontend && npm start`

## Project Structure

```
.
├── backend/          # Express.js API server
├── frontend/         # React application
├── api/              # Vercel serverless functions (if needed)
├── docker-compose.yml # Docker configuration
├── vercel.json       # Vercel configuration
└── DEPLOYMENT.md     # Deployment guide
```

## License

MIT

