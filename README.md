<p align="center">
  <img src="https://img.icons8.com/fluency/96/task-planning.png" alt="TaskMaster Logo" width="80" />
</p>

<h1 align="center">TaskMaster — Full-Stack Task Management Dashboard</h1>

<p align="center">
  A modern, full-stack task management application with JWT authentication, real-time CRUD operations, and a premium glassmorphic UI — built with React, Node.js, Express, and PostgreSQL.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
</p>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#database-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**TaskMaster** is a production-ready task management dashboard designed for individual productivity. Users can register, log in, and manage their personal task lists with full CRUD capabilities — all behind a secure JWT-based authentication layer.

The frontend delivers a premium experience with glassmorphism effects, smooth micro-animations, and a responsive sidebar layout. The backend follows a clean MVC architecture with parameterized SQL queries for security and performance.

---

## Features

### Authentication & Security
- **User Registration & Login** with email and password
- **Password Hashing** using bcrypt with configurable salt rounds
- **JWT-based Session Management** — tokens expire after 24 hours
- **Protected Routes** — unauthorized users are redirected to login
- **Per-user Data Isolation** — users can only access their own tasks

### Task Management
- **Create, Read, Update, Delete (CRUD)** tasks with a modal-based UI
- **Task Fields**: title, description, status (Pending/Completed), priority (Low/Medium/High), and due date
- **One-click Status Toggle** — mark tasks as completed or pending directly from the card
- **Inline Edit & Delete** with confirmation dialogs

### Search & Filtering
- **Real-time Search** — filter tasks by title or description (case-insensitive via PostgreSQL `ILIKE`)
- **Priority Filter** — dropdown to show only Low, Medium, or High priority tasks
- **Status Filter** — sidebar navigation filters by Pending or Completed tasks
- **Server-side Filtering** — all filtering is handled at the database level for performance

### Dashboard & Analytics
- **Statistics Cards** — live counts of Total Tasks, Completed, and In-Progress
- **Responsive Grid Layout** — task cards arranged in 1/2/3 column grid based on viewport

### UI/UX
- **Glassmorphism Design** — frosted glass cards with backdrop blur and subtle shadows
- **Premium Gradient Accents** — animated gradient backgrounds on auth pages
- **Color-coded Priority Badges** — emerald (Low), amber (Medium), rose (High)
- **Micro-animations** — hover elevations, scale transitions, loading spinners
- **Custom Scrollbar** styling
- **Inter Font** from Google Fonts for clean typography
- **Lucide React Icons** throughout the interface
- **Empty State Design** — friendly message when no tasks exist

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI library with functional components and hooks |
| **Vite 8** | Lightning-fast build tool and dev server |
| **Tailwind CSS 4** | Utility-first CSS framework with custom theme |
| **React Router DOM 7** | Client-side routing with protected routes |
| **Axios** | HTTP client with request interceptors for JWT |
| **Lucide React** | Modern icon library |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web framework with middleware pipeline |
| **PostgreSQL** | Relational database with `pg` driver |
| **bcrypt** | Password hashing |
| **jsonwebtoken** | JWT generation and verification |
| **dotenv** | Environment variable management |
| **cors** | Cross-Origin Resource Sharing |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                    │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────────┐  │
│  │  Login   │  │ Register │  │Dashboard │  │  Task Modal    │  │
│  │  Page    │  │  Page    │  │  Page    │  │  (Create/Edit) │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬────────┘  │
│       │              │             │                │            │
│       └──────────────┴─────────────┴────────────────┘            │
│                            │                                     │
│                   ┌────────┴────────┐                            │
│                   │  AuthContext    │  (JWT Token Management)    │
│                   │  + API Service │  (Axios Interceptors)      │
│                   └────────┬────────┘                            │
└────────────────────────────┼────────────────────────────────────┘
                             │ HTTP (REST API)
┌────────────────────────────┼────────────────────────────────────┐
│                     SERVER (Express.js)                         │
│                            │                                    │
│                   ┌────────┴────────┐                           │
│                   │   Middleware    │                            │
│                   │  (CORS, JSON,  │                            │
│                   │   JWT Auth)    │                            │
│                   └────────┬────────┘                           │
│                            │                                    │
│            ┌───────────────┴───────────────┐                    │
│    ┌───────┴───────┐             ┌─────────┴──────┐            │
│    │ Auth Routes   │             │ Task Routes    │            │
│    │ POST /login   │             │ GET    /tasks  │            │
│    │ POST /register│             │ POST   /tasks  │            │
│    └───────┬───────┘             │ PUT    /tasks/:id           │
│            │                     │ DELETE /tasks/:id           │
│    ┌───────┴───────┐             └─────────┬──────┘            │
│    │Auth Controller│             ┌─────────┴──────┐            │
│    └───────┬───────┘             │Task Controller │            │
│            │                     └─────────┬──────┘            │
│            └───────────────┬───────────────┘                    │
│                            │                                    │
│                   ┌────────┴────────┐                           │
│                   │   PostgreSQL    │                            │
│                   │   (pg Pool)    │                            │
│                   └─────────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Project Structure

```
task-management-dashboard-fullstack/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js      # Register & login logic (bcrypt + JWT)
│   │   └── taskController.js      # CRUD operations with filtering & search
│   │
│   ├── db/
│   │   ├── index.js               # PostgreSQL connection pool configuration
│   │   └── setup.sql              # Database schema (users + tasks tables)
│   │
│   ├── middleware/
│   │   └── auth.js                # JWT verification middleware
│   │
│   ├── routes/
│   │   ├── authRoutes.js          # POST /api/register, POST /api/login
│   │   └── taskRoutes.js          # Protected CRUD routes for /api/tasks
│   │
│   ├── .env.example               # Environment variable template
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Express app entry point
│
├── frontend/
│   ├── public/                    # Static assets
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx        # Navigation sidebar with user info & logout
│   │   │   ├── TaskCard.jsx       # Individual task display with status toggle
│   │   │   └── TaskModal.jsx      # Create/edit task form modal
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # Auth state provider (login, register, logout)
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx      # Main dashboard with stats, search & task grid
│   │   │   ├── Login.jsx          # Login page with glassmorphic design
│   │   │   └── Register.jsx       # Registration page with password confirmation
│   │   │
│   │   ├── services/
│   │   │   └── api.js             # Axios instance with JWT interceptor
│   │   │
│   │   ├── App.jsx                # Root component with routing & protected routes
│   │   ├── App.css                # Vite scaffold styles (unused)
│   │   ├── index.css              # Global styles, Tailwind theme & glassmorphism
│   │   └── main.jsx               # React DOM entry point
│   │
│   ├── index.html                 # HTML template with Inter font & meta tags
│   ├── vite.config.js             # Vite + React + Tailwind CSS plugin config
│   └── package.json               # Frontend dependencies
│
├── .gitignore                     # Ignores node_modules, .env, .DS_Store
└── README.md                      # This file
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **PostgreSQL** (v14 or higher) — [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

### Database Setup

1. Start your PostgreSQL server and connect via `psql` or pgAdmin.

2. Create the database:
   ```sql
   CREATE DATABASE task_management;
   ```

3. Connect to the database and run the schema:
   ```sql
   \c task_management
   ```
   ```sql
   -- Create users table
   CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );

   -- Create tasks table
   CREATE TABLE IF NOT EXISTS tasks (
       id SERIAL PRIMARY KEY,
       user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
       title VARCHAR(255) NOT NULL,
       description TEXT,
       status VARCHAR(50) DEFAULT 'Pending',
       priority VARCHAR(50) DEFAULT 'Medium',
       due_date TIMESTAMP WITH TIME ZONE,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );
   ```

   Or run the provided SQL file:
   ```bash
   psql -U postgres -d task_management -f backend/db/setup.sql
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the template:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your PostgreSQL credentials:
   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=task_management
   JWT_SECRET=your_secure_secret_key_here
   ```

5. Start the backend server:
   ```bash
   node server.js
   ```
   The API will be running at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. *(Optional)* If your backend is running on a different URL, create a `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `PORT` | Server port | `5000` |
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | — |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `DB_NAME` | Database name | `task_management` |
| `JWT_SECRET` | Secret key for signing JWTs | — |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Backend API base URL | `http://localhost:5000/api` |

---

## API Reference

### Authentication

#### Register
```http
POST /api/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response** `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "user@example.com" }
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}
```
**Response** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "user@example.com" }
}
```

---

### Tasks *(All routes require `Authorization: Bearer <token>` header)*

#### Get All Tasks
```http
GET /api/tasks?status=Pending&priority=High&search=report
```
**Query Parameters** (all optional):
| Param | Type | Description |
|---|---|---|
| `status` | string | Filter by `Pending` or `Completed` |
| `priority` | string | Filter by `Low`, `Medium`, or `High` |
| `search` | string | Case-insensitive search in title and description |

**Response** `200 OK`
```json
[
  {
    "id": 1,
    "user_id": 1,
    "title": "Finalize Q3 Report",
    "description": "Complete the quarterly marketing report",
    "status": "Pending",
    "priority": "High",
    "due_date": "2026-05-15T00:00:00.000Z",
    "created_at": "2026-05-01T10:00:00.000Z"
  }
]
```

#### Create Task
```http
POST /api/tasks
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "New Task",
  "description": "Task details here",
  "status": "Pending",
  "priority": "Medium",
  "due_date": "2026-06-01"
}
```
**Response** `201 Created`

#### Update Task
```http
PUT /api/tasks/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "title": "Updated Title",
  "status": "Completed"
}
```
**Response** `200 OK` — returns updated task object. Uses `COALESCE` so only provided fields are updated.

#### Delete Task
```http
DELETE /api/tasks/:id
Authorization: Bearer <token>
```
**Response** `200 OK`
```json
{ "message": "Task deleted successfully" }
```

---

## Screenshots

<!-- 
Add your own screenshots here. Recommended screenshots:
1. Login page
2. Register page  
3. Dashboard with tasks
4. Create/Edit task modal
5. Empty state
6. Filtered view

Example:
![Login Page](./screenshots/login.png)
![Dashboard](./screenshots/dashboard.png)
-->

> Screenshots coming soon — run the project locally to experience the premium UI!

---

## Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Syed-Abdul-Mateen">Syed Abdul Mateen</a>
</p>
