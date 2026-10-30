# Unidos Solidários — Backend

REST API for **Unidos Solidários**, a project supporting the work of a nonprofit organization in Porto Alegre, Brazil.

The API provides authentication and data operations for the thrift-store clothing catalog and user interests.

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

The frontend application is maintained separately: [unidos-solidarios-front](https://github.com/gomezllari/unidos-solidarios-front).

---

This project was developed as part of an academic and social-impact initiative.
