# Media Signal Service

A full-stack application for ingesting, enriching and exploring news articles using AI.

This project was developed as part of a technical assessment and demonstrates the design of a scalable backend API, AI-powered article enrichment, Boolean search capabilities, and a React-based user interface.

---

## Features

- RESTful API built with NestJS
- PostgreSQL database
- AI-powered article enrichment
- Boolean search support
- Article statistics and aggregation
- Swagger API documentation
- Dockerized development environment
- Automated database seeding
- Unit testing

---

## Tech Stack

### Backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Docker

### Frontend

- React
- Vite
- TypeScript
- React Router
- Axios
- Tailwind CSS
- shadcn/ui
- Vitest
- React Testing Library

### AI

- OpenAI _(or the selected provider)_

---

## Project Structure

```text
media-signal-service/
│
├── backend/             # NestJS REST API
├── frontend/            # React application
│
├── .env.template        # Environment variables template for PostgreSQL
├── .gitignore
├── docker-compose.yml   # PostgreSQL Docker configuration
└── README.md
```

---

# Getting Started

## 1. Clone the repository

```bash
git clone git@github.com:victorgraciaweb/media-signal-service.git

cd media-signal-service
```

---

## 2. Configure environment variables

Copy the environment template.

```bash
cp backend/.env.template backend/.env
cp frontend/.env.template frontend/.env
cp .env.template .env
```

Copy the `.env` files with your local configuration.

---

## 3. Install dependencies

### Backend

```bash
cd backend

yarn install
```

### Frontend

```bash
cd ../frontend

npm install
```

---

## 4. Start PostgreSQL

From the project root:

```bash
docker compose up -d
```

---

## 5. Start the Backend

```bash
cd backend

yarn start:dev
```

Backend:

```
http://localhost:3000
```

---

## 6. Start the Frontend

```bash
cd frontend

npm run dev
```

Frontend:

```
http://localhost:5173
```

---

# Database Seed

Populate the database with sample articles.

```bash
cd backend
npm run seed
```

---

# API Documentation

Swagger documentation is available after starting the backend.

GET http://localhost:3000/api/docs

The documentation includes all available endpoints, request bodies and response schemas.

---

# Health Check

Verify that the backend is running correctly.

GET http://localhost:3000/api/health

Example response:

```json
{
  "status": "ok",
  "timestamp": "2026-07-22T18:30:15.123Z",
  "uptime": 452.81
}
```

---

# Running Tests (only Backend)

Run all tests.

```bash
yarn test
```

Run tests with coverage.

```bash
yarn test:cov
```

---

# Development Notes

This repository is organized as a full-stack application with independent backend and frontend projects orchestrated through Docker Compose.

The solution follows modern engineering practices including:

- Modular architecture
- Environment-based configuration
- Dockerized development
- API-first design
- Automatic database seeding
- Interactive API documentation

---

# License

This project was created exclusively as part of a technical assessment.
