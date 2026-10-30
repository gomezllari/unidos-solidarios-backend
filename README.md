# Unidos Solidários — Thrift Store App (Backend API)

Backend API of **Unidos Solidários**, an academic project developed as part of the Systems Analysis and Development degree at **Unisinos**.

The project consists of an app for a thrift store connected to the Unidos Solidários initiative. This repository contains the REST API and data layer that support the frontend application.

## Features

- User registration and login
- Password hashing
- JWT-based authentication
- Role and permission checks
- Clothing catalog operations (list, create, update and delete)
- Registering, listing and removing user interests
- PostgreSQL persistence through TypeORM

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- TypeORM
- JSON Web Token (JWT)
- bcryptjs
- dotenv

## Configuration

Create a `.env` file in the project root and provide the database connection settings and application secrets:

```env
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
JWT_SECRET=
MASTER_KEY=
PORT=3000
```

Use your own values and keep secrets out of version control.

## Getting Started

```bash
npm install
npm start
```

The server uses the `PORT` environment variable and defaults to port `3000`.

## Main Routes

| Method | Route | Purpose |
|---|---|---|
| POST | `/auth/cadastrar` | Register a user |
| POST | `/auth/entrar` | Authenticate a user |
| GET | `/auth/info` | Retrieve authenticated user information |
| GET | `/brecho` | List clothing items |
| POST | `/brecho` | Add a clothing item |
| PUT | `/brecho/:id` | Update a clothing item |
| DELETE | `/brecho/:roupaId` | Remove a clothing item |
| GET | `/brecho/interesses` | List the authenticated user's interests |

Some routes require authentication and/or specific permissions.

## Related Repository

The frontend application is part of the same academic project: [unidos-solidarios-front](https://github.com/gomezllari/unidos-solidarios-front).

---

**Academic project:** developed during the Systems Analysis and Development degree at Unisinos.
