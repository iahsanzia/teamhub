# TeamHub API

A backend REST API for team collaboration and project management. TeamHub lets teams organize projects, assign tasks, and track team activity — all secured with JWT authentication.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Features

- User registration and login with JWT authentication
- Team creation and member management
- Project creation scoped to teams
- Task assignment, status tracking, and due dates
- Activity logging across teams, projects, and tasks
- Security: rate limiting, HTTP headers hardening, NoSQL injection prevention, and parameter pollution protection

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Password Hashing:** bcrypt
- **Security:** Helmet, express-mongo-sanitize, HPP, express-rate-limit, CORS
- **Logging:** Morgan

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/iahsanzia/teamhub.git
   cd teamhub
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables)).

4. Start the development server:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:8000` by default.

## Environment Variables

Create a `.env` file in the project root with the following variables:

| Variable            | Description                                          |
|---------------------|------------------------------------------------------|
| `PORT`              | Port the server listens on (default: `8000`)         |
| `DATABASE`          | MongoDB connection string with `<PASSWORD>` placeholder |
| `DATABASE_PASSWORD` | Password used to replace `<PASSWORD>` in the connection string |
| `JWT_SECRET`        | Secret key used to sign and verify JWT tokens        |
| `NODE_ENV`          | `development` or `production`                        |

Example:

```env
PORT=8000
DATABASE=mongodb+srv://user:<PASSWORD>@cluster.mongodb.net/teamhub
DATABASE_PASSWORD=your_password
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

## API Endpoints

All protected routes require an `Authorization: Bearer <token>` header.

### Users

| Method | Endpoint                     | Auth     | Description              |
|--------|------------------------------|----------|--------------------------|
| POST   | `/api/users/register`        | Public   | Register a new user      |
| POST   | `/api/users/login`           | Public   | Log in and receive a JWT |
| GET    | `/api/users/me`              | Required | Get current user profile |
| PATCH  | `/api/users/updatePassword`  | Required | Update password          |

### Teams

| Method | Endpoint                                   | Auth     | Description        |
|--------|--------------------------------------------|----------|--------------------|
| POST   | `/api/teams`                               | Required | Create a team      |
| GET    | `/api/teams`                               | Required | Get user's teams   |
| PATCH  | `/api/teams/:teamId/add-member`            | Required | Add a team member  |
| PATCH  | `/api/teams/:teamId/remove-member/:userId` | Required | Remove a member    |
| DELETE | `/api/teams/:teamId`                       | Required | Delete a team      |

### Projects

| Method | Endpoint                     | Auth     | Description              |
|--------|------------------------------|----------|--------------------------|
| POST   | `/api/:teamId/projects`      | Required | Create a project         |
| GET    | `/api/:teamId/projects`      | Required | Get projects for a team  |
| PATCH  | `/api/project/:projectId`    | Required | Update a project         |
| DELETE | `/api/project/:projectId`    | Required | Delete a project         |

### Tasks

| Method | Endpoint                                | Auth     | Description                  |
|--------|-----------------------------------------|----------|------------------------------|
| POST   | `/api/projects/:projectId/tasks`        | Required | Create a task                |
| GET    | `/api/projects/:projectId/tasks`        | Required | Get tasks for a project      |
| GET    | `/api/tasks/my-tasks`                   | Required | Get tasks assigned to me     |
| PATCH  | `/api/tasks/:taskId`                    | Required | Update a task                |
| DELETE | `/api/tasks/:taskId`                    | Required | Delete a task                |

### Activities

| Method | Endpoint           | Auth     | Description            |
|--------|--------------------|----------|------------------------|
| GET    | `/api/activities`  | Required | Get activity logs      |
| POST   | `/api/activities`  | Required | Create an activity log |

## Project Structure

```
teamhub/
├── server.js          # Entry point: starts server and connects to MongoDB
├── app.js             # Express app setup: middleware and route mounting
├── config/
│   └── db.js          # MongoDB connection logic
├── controllers/       # Request handlers for each resource
├── models/            # Mongoose schemas (User, Team, Project, Task, Activity)
├── routes/            # Express route definitions
├── middlewares/
│   ├── authMiddleware.js   # JWT verification
│   └── errorMiddleware.js  # Global error handler
└── utils/
    ├── appError.js         # Custom error class
    ├── catchAsync.js       # Async error wrapper
    └── createActivity.js   # Activity logging helper
```
