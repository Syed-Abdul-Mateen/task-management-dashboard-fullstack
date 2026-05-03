<p align="center">
  <img src="https://img.icons8.com/fluency/96/task-planning.png" alt="TaskMaster Logo" width="80" />
</p>

<h1 align="center">TaskMaster</h1>
<h3 align="center">Full-Stack Task Management Dashboard</h3>

<p align="center">
  A production-ready task management application featuring JWT authentication, full CRUD operations, server-side filtering, and a modern glassmorphic user interface. Built with React, Node.js, Express, and PostgreSQL.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Node.js-Express_5-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/PostgreSQL-17-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT" />
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
  - [Authentication Endpoints](#authentication-endpoints)
  - [Task Endpoints](#task-endpoints)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

TaskMaster is a full-stack web application designed for personal task and productivity management. Users can register an account, authenticate securely, and manage their task lists through an intuitive dashboard interface. The application enforces per-user data isolation, ensuring that each user can only access and modify their own tasks.

The frontend delivers a polished experience with glassmorphism effects, smooth micro-animations, and a responsive layout. The backend follows a clean MVC architecture with parameterized SQL queries to prevent injection attacks, and uses connection pooling for efficient database access.

---

## Features

### Authentication and Security
- User registration and login with email and password
- Password hashing using bcrypt with configurable salt rounds
- JWT-based session management with 24-hour token expiry
- Protected route middleware on all task endpoints
- Per-user data isolation at the database query level

### Task Management
- Full CRUD operations (Create, Read, Update, Delete) through a modal-based interface
- Task fields include title, description, status (Pending / Completed), priority (Low / Medium / High), and due date
- One-click status toggle directly from the task card
- Inline edit and delete actions with confirmation dialogs
- Partial updates supported via SQL `COALESCE` (only provided fields are modified)

### Search and Filtering
- Real-time search by title or description using PostgreSQL `ILIKE` for case-insensitive matching
- Priority filter dropdown (Low, Medium, High)
- Status-based filtering via sidebar navigation (Pending, Completed)
- All filtering is performed server-side at the database level for optimal performance

### Dashboard Analytics
- Live statistics cards displaying Total Tasks, Completed, and In-Progress counts
- Responsive grid layout that adapts from 1 to 3 columns based on viewport width

### User Interface
- Glassmorphism design with frosted glass cards, backdrop blur, and layered shadows
- Premium gradient accents on authentication pages with animated background orbs
- Color-coded priority badges: emerald for Low, amber for Medium, rose for High
- Micro-animations including hover elevations, scale transitions, and loading spinners
- Custom scrollbar styling for a consistent look across browsers
- Inter typeface from Google Fonts for clean, modern typography
- Lucide React icon set used throughout the interface
- Friendly empty state with call-to-action when no tasks are present

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library with functional components and hooks |
| Vite | 8 | Build tool and development server |
| Tailwind CSS | 4 | Utility-first CSS framework with custom theme tokens |
| React Router DOM | 7 | Client-side routing with protected route wrappers |
| Axios | 1.15 | HTTP client with request interceptors for JWT injection |
| Lucide React | 1.14 | SVG icon library |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | JavaScript runtime environment |
| Express | 5 | Web framework with middleware pipeline |
| PostgreSQL | 14+ | Relational database |
| pg | 8.20 | PostgreSQL client for Node.js with connection pooling |
| bcrypt | 6 | Password hashing |
| jsonwebtoken | 9 | JWT generation and verification |
| dotenv | 17 | Environment variable management |
| cors | 2.8 | Cross-Origin Resource Sharing middleware |

---

## Architecture

```
+------------------------------------------------------------------+
|                     CLIENT  (React + Vite)                        |
|                                                                   |
|  +----------+  +----------+  +-----------+  +-----------------+  |
|  |  Login   |  | Register |  | Dashboard |  |   Task Modal    |  |
|  |  Page    |  |  Page    |  |   Page    |  |  (Create/Edit)  |  |
|  +----+-----+  +----+-----+  +-----+-----+  +--------+--------+  |
|       |              |              |                  |           |
|       +--------------+--------------+------------------+           |
|                              |                                    |
|                   +----------+----------+                         |
|                   |    AuthContext      |  (JWT Token Management) |
|                   |    + API Service   |  (Axios Interceptors)   |
|                   +----------+----------+                         |
+---------------------|-----------|-----------------------------+   |
                      |  REST API |                                 |
+---------------------|-----------|-----------------------------+   |
|                     SERVER  (Express.js)                          |
|                              |                                    |
|                   +----------+----------+                         |
|                   |     Middleware      |                         |
|                   |  (CORS, JSON,      |                         |
|                   |   JWT Auth)        |                         |
|                   +----------+----------+                         |
|                              |                                    |
|            +-----------------+-----------------+                  |
|    +-------+--------+               +---------+--------+         |
|    |  Auth Routes   |               |   Task Routes    |         |
|    |  POST /login   |               |   GET    /tasks  |         |
|    |  POST /register|               |   POST   /tasks  |         |
|    +-------+--------+               |   PUT  /tasks/:id|         |
|            |                        |   DELETE /tasks/:id        |
|    +-------+--------+               +---------+--------+         |
|    | Auth Controller|               | Task Controller  |         |
|    +-------+--------+               +---------+--------+         |
|            +------------------+----------------+                  |
|                               |                                   |
|                    +----------+----------+                        |
|                    |     PostgreSQL      |                        |
|                    |     (pg Pool)      |                        |
|                    +---------------------+                        |
+-------------------------------------------------------------------+
```

---

## Project Structure

```
task-management-dashboard-fullstack/
|
|-- backend/
|   |-- controllers/
|   |   |-- authController.js        # Registration and login logic (bcrypt + JWT)
|   |   |-- taskController.js        # CRUD operations with server-side filtering
|   |
|   |-- db/
|   |   |-- index.js                 # PostgreSQL connection pool configuration
|   |   |-- setup.sql                # Database schema definition
|   |
|   |-- middleware/
|   |   |-- auth.js                  # JWT token verification middleware
|   |
|   |-- routes/
|   |   |-- authRoutes.js            # POST /api/register, POST /api/login
|   |   |-- taskRoutes.js            # Protected CRUD routes for /api/tasks
|   |
|   |-- .env.example                 # Environment variable template
|   |-- package.json                 # Backend dependencies and scripts
|   |-- server.js                    # Express application entry point
|
|-- frontend/
|   |-- public/                      # Static assets (favicon, etc.)
|   |
|   |-- src/
|   |   |-- components/
|   |   |   |-- Sidebar.jsx          # Navigation sidebar with user info and logout
|   |   |   |-- TaskCard.jsx         # Task display card with status toggle
|   |   |   |-- TaskModal.jsx        # Modal form for creating and editing tasks
|   |   |
|   |   |-- context/
|   |   |   |-- AuthContext.jsx      # Authentication state provider
|   |   |
|   |   |-- pages/
|   |   |   |-- Dashboard.jsx        # Main dashboard with stats, search, and task grid
|   |   |   |-- Login.jsx            # Login page with glassmorphic design
|   |   |   |-- Register.jsx         # Registration page with password confirmation
|   |   |
|   |   |-- services/
|   |   |   |-- api.js               # Axios instance with JWT interceptor
|   |   |
|   |   |-- App.jsx                  # Root component with routing and protected routes
|   |   |-- App.css                  # Additional component styles
|   |   |-- index.css                # Global styles, Tailwind theme, and glassmorphism
|   |   |-- main.jsx                 # React DOM entry point
|   |
|   |-- index.html                   # HTML template with Inter font
|   |-- vite.config.js               # Vite + React + Tailwind CSS plugin configuration
|   |-- package.json                 # Frontend dependencies and scripts
|
|-- .gitignore                       # Ignores node_modules, .env, .DS_Store
|-- README.md                        # Project documentation
```

---

## Getting Started

### Prerequisites

Ensure the following tools are installed on your system:

| Tool | Minimum Version | Download |
|---|---|---|
| Node.js | 18.x | [nodejs.org](https://nodejs.org/) |
| npm | 9.x | Included with Node.js |
| PostgreSQL | 14.x | [postgresql.org](https://www.postgresql.org/download/) |

### Database Setup

1. Start your PostgreSQL server and connect using `psql` or a GUI tool such as pgAdmin.

2. Create the application database:
   ```sql
   CREATE DATABASE task_management;
   ```

3. Connect to the newly created database:
   ```sql
   \c task_management
   ```

4. Run the schema to create the required tables:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
       id SERIAL PRIMARY KEY,
       email VARCHAR(255) UNIQUE NOT NULL,
       password_hash VARCHAR(255) NOT NULL,
       created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
   );

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

   Alternatively, run the provided SQL file directly:
   ```bash
   psql -U postgres -d task_management -f backend/db/setup.sql
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create the environment configuration file:
   ```bash
   cp .env.example .env
   ```

4. Open `.env` and update the values with your PostgreSQL credentials and a secure JWT secret:
   ```env
   PORT=5000
   DB_USER=postgres
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=task_management
   JWT_SECRET=your_secure_random_secret_key
   ```

5. Start the server:
   ```bash
   node server.js
   ```

   The API server will be available at `http://localhost:5000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. (Optional) If the backend is hosted on a different URL, create a `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default Value |
|---|---|---|
| `PORT` | Port number for the Express server | `5000` |
| `DB_USER` | PostgreSQL username | `postgres` |
| `DB_PASSWORD` | PostgreSQL password | None (required) |
| `DB_HOST` | PostgreSQL host address | `localhost` |
| `DB_PORT` | PostgreSQL port number | `5432` |
| `DB_NAME` | Name of the PostgreSQL database | `task_management` |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens | None (required) |

### Frontend (`frontend/.env`)

| Variable | Description | Default Value |
|---|---|---|
| `VITE_API_URL` | Base URL for the backend REST API | `http://localhost:5000/api` |

---

## API Reference

All endpoints are prefixed with `/api`. Task endpoints require an `Authorization: Bearer <token>` header.

### Authentication Endpoints

#### Register a New User

```
POST /api/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Success Response:** `201 Created`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Error Responses:**

| Status | Description |
|---|---|
| `400` | User with the provided email already exists |
| `500` | Internal server error |

---

#### Log In

```
POST /api/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Success Response:** `200 OK`
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

**Error Responses:**

| Status | Description |
|---|---|
| `401` | Invalid email or password |
| `500` | Internal server error |

---

### Task Endpoints

All task endpoints require a valid JWT token in the `Authorization` header.

#### Get All Tasks

```
GET /api/tasks
```

**Query Parameters (all optional):**

| Parameter | Type | Description |
|---|---|---|
| `status` | `string` | Filter by `Pending` or `Completed` |
| `priority` | `string` | Filter by `Low`, `Medium`, or `High` |
| `search` | `string` | Case-insensitive search across title and description |

**Example Request:**
```
GET /api/tasks?status=Pending&priority=High&search=report
```

**Success Response:** `200 OK`
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

---

#### Create a Task

```
POST /api/tasks
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Details about the task",
  "status": "Pending",
  "priority": "Medium",
  "due_date": "2026-06-01"
}
```

**Success Response:** `201 Created` (returns the created task object)

---

#### Update a Task

```
PUT /api/tasks/:id
```

**Request Body (all fields optional):**
```json
{
  "title": "Updated Title",
  "status": "Completed"
}
```

**Success Response:** `200 OK` (returns the updated task object)

Only the fields included in the request body will be modified. All other fields retain their current values.

**Error Responses:**

| Status | Description |
|---|---|
| `404` | Task not found or does not belong to the authenticated user |
| `500` | Internal server error |

---

#### Delete a Task

```
DELETE /api/tasks/:id
```

**Success Response:** `200 OK`
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses:**

| Status | Description |
|---|---|
| `404` | Task not found or does not belong to the authenticated user |
| `500` | Internal server error |

---

## Database Schema

The application uses two tables with a foreign key relationship. Deleting a user cascades to remove all associated tasks.

### Users Table

| Column | Type | Constraints |
|---|---|---|
| `id` | `SERIAL` | Primary Key |
| `email` | `VARCHAR(255)` | Unique, Not Null |
| `password_hash` | `VARCHAR(255)` | Not Null |
| `created_at` | `TIMESTAMPTZ` | Default: `CURRENT_TIMESTAMP` |

### Tasks Table

| Column | Type | Constraints |
|---|---|---|
| `id` | `SERIAL` | Primary Key |
| `user_id` | `INTEGER` | Foreign Key referencing `users(id)`, On Delete Cascade |
| `title` | `VARCHAR(255)` | Not Null |
| `description` | `TEXT` | Nullable |
| `status` | `VARCHAR(50)` | Default: `'Pending'` |
| `priority` | `VARCHAR(50)` | Default: `'Medium'` |
| `due_date` | `TIMESTAMPTZ` | Nullable |
| `created_at` | `TIMESTAMPTZ` | Default: `CURRENT_TIMESTAMP` |

### Entity Relationship

```
+------------------+          +------------------+
|      users       |          |      tasks       |
+------------------+          +------------------+
| id (PK)          |----+     | id (PK)          |
| email            |    |     | user_id (FK)     |
| password_hash    |    +----<| title            |
| created_at       |          | description      |
+------------------+          | status           |
                              | priority         |
                              | due_date         |
                              | created_at       |
                              +------------------+
```

---

## Screenshots

> To be added. Run the project locally to preview the full user interface including the login page, registration page, dashboard overview, task creation modal, and filtered views.

<!--
To add screenshots:
1. Create a /screenshots directory at the project root
2. Capture images of each page
3. Reference them as shown below:

![Login Page](./screenshots/login.png)
![Dashboard](./screenshots/dashboard.png)
![Task Modal](./screenshots/task-modal.png)
-->

---

## Deployment

### Frontend (Vercel)

1. Push the repository to GitHub.
2. Import the project on [Vercel](https://vercel.com/).
3. Set the root directory to `frontend`.
4. Add the environment variable `VITE_API_URL` pointing to your deployed backend URL.
5. Deploy.

### Backend (Railway / Render / VPS)

1. Deploy the `backend` directory to your hosting provider of choice.
2. Set all required environment variables (`PORT`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`, `DB_NAME`, `JWT_SECRET`).
3. Ensure the PostgreSQL database is accessible from the deployed server.
4. Update the frontend `VITE_API_URL` to match the deployed backend URL.

---

## Contributing

Contributions are welcome. To contribute:

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request describing your changes.

Please ensure your code follows the existing project conventions and includes appropriate comments where necessary.

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Author

**Syed Abdul Mateen**

- GitHub: [github.com/Syed-Abdul-Mateen](https://github.com/Syed-Abdul-Mateen)
