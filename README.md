# Internshala Assignment - Fullstack Application

## Overview
This repository contains a full-stack web application designed for the backend developer intern assignment. It includes a scalable REST API with JWT authentication and role-based access control, alongside a simple frontend UI built with React.js using vanilla JavaScript and CSS to interact with the backend APIs.

## Tech Stack
- **Backend:** Node.js, Express.js, MongoDB
- **Frontend:** React.js, Vite, Axios, React Router DOM
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Documentation:** Swagger (OpenAPI 3.0)

## Features
### Backend
- User authentication (Register & Login) with Bcrypt password hashing
- JWT-based authorization
- Role-based Access Control (Roles: `user`, `admin`)
- Complete CRUD operations for a secondary entity (`Tasks`)
- Error handling, API versioning, input validation
- Swagger API Documentation

### Frontend
- Clean and modern "Glassmorphism" UI design
- User registration and login flows
- Protected routes/dashboard (accessible only with JWT)
- View, create, edit, and delete tasks
- Success/error feedback handling via UI notifications

---

## Setup & Run Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB Database (Local or MongoDB Atlas)

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file inside `backend/`:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/internshalaProject
   JWT_SECRET=supersecretpassword123
   JWT_EXPIRES_IN=1d
   ```
4. Start the backend development server:
   ```bash
   npm start
   # API will be available at http://localhost:5000
   # Swagger docs at http://localhost:5000/api-docs
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   # Frontend app will be available typically at http://localhost:5173
   ```

---

## Short Scalability Note

To manage future growth and ensure performance, the following scaling strategies can be implemented:
1. **Microservices Architecture:** As the application modules (e.g., auth, tasks) grow, they can be separated into distinct microservices interacting over gRPC or message queues.
2. **Database Sharding & Replication:** MongoDB supports horizontal scaling through sharding, distributing data across multiple machines based on shard keys. Read replicas can handle read-heavy traffic.
3. **Caching (Redis):** Frequently accessed data (like static task listings or user profiles) can be cached in memory (Redis) to offload database query times.
4. **Load Balancing:** Deploying multiple instances of the backend application behind a reverse proxy/load balancer (like Nginx, AWS ALB) distributes traffic dynamically.
5. **Docker & Container Orchestration:** Dockerizing backend and frontend alongside Kubernetes ensures easy scaling, automatic restart of failing containers, and zero-downtime rolling deployments.
