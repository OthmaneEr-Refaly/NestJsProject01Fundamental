# 🚀 NestJS Project 01

A RESTful API built with [NestJS](https://nestjs.com/) that demonstrates core framework concepts including middleware, guards, interceptors, pipes, and validation.

---

## 📦 Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation & Running the Project

```bash
# 1. Clone the repository
git clone https://github.com/OthmaneEr-Refaly/NestJsProject01.git

# 2. Navigate into the project directory
cd NestJsProject01

# 3. Install dependencies
npm install

# 4. Start the development server
npm run start:dev
```

The API will be available at **`http://localhost:3000`**

### Available Scripts

| Command | Description |
|---|---|
| `npm run start` | Start the app in production mode |
| `npm run start:dev` | Start with hot-reload (development) |
| `npm run start:debug` | Start in debug mode |
| `npm run build` | Build the project to `/dist` |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Run tests with coverage report |

### API Endpoints

All requests to `/user` routes require the header `x-api-key: secret-key-abc`.  
`DELETE /user/:id` additionally requires the header `role: admin`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/user` | Get all users |
| `GET` | `/user/:id` | Get a user by ID |
| `POST` | `/user` | Create a new user |
| `PUT` | `/user/:id` | Update an existing user |
| `DELETE` | `/user/:id` | Delete a user *(admin only)* |

---

## 🧠 About NestJS

[NestJS](https://nestjs.com/) is a progressive **Node.js framework** for building efficient, scalable, and maintainable server-side applications. It is built with **TypeScript** and heavily inspired by **Angular**, bringing a well-structured, opinionated architecture to the backend world.

### Key Concepts

- **Modules** — The fundamental building blocks of a NestJS app. Every application has at least one root module (`AppModule`), and features are organized into feature modules (e.g., `UserModule`).

- **Controllers** — Responsible for handling incoming HTTP requests and returning responses. They delegate business logic to services.

- **Services / Providers** — Classes decorated with `@Injectable()` that contain the business logic. They are injected into controllers or other services via NestJS's built-in **Dependency Injection** system.

- **Decorators** — NestJS makes extensive use of TypeScript decorators (`@Controller`, `@Get`, `@Body`, `@UseGuards`, etc.) to declaratively define routes, inject dependencies, and configure behavior.

- **DTOs (Data Transfer Objects)** — Plain classes used to define the shape of data coming in. Combined with `class-validator`, they enable automatic request validation.

NestJS runs on top of **Express** (by default) or **Fastify**, meaning it benefits from the rich Node.js ecosystem while adding a powerful abstraction layer on top.

---

## 🔄 Request Life Cycle

When a client sends a request to this application, it passes through several layers before a response is sent back. Here's how it flows:

```
Client Request
      │
      ▼
 1. Middleware          (ApiKeyMiddleware)
      │  Validates the x-api-key header before the request
      │  reaches any route. Rejects invalid keys immediately.
      ▼
 2. Guards              (RoleGuard)
      │  Checks authorization at the route level.
      │  Used on DELETE /user/:id to allow admins only.
      ▼
 3. Interceptors (pre)  (TransformInterceptor)
      │  Runs before the handler. Can modify the request
      │  or add logic before the route handler executes.
      ▼
 4. Pipes               (ValidationPipe)
      │  Validates and transforms incoming request data
      │  against the DTO schema (e.g., CreateUserDto).
      ▼
 5. Route Handler       (Controller method)
      │  Executes the actual business logic via the Service.
      ▼
 6. Interceptors (post) (TransformInterceptor)
      │  Wraps the response in a standard format:
      │  { statusCode, message: "Success", data: ... }
      ▼
Client Response
```

Each layer has a single responsibility, keeping the codebase clean, testable, and easy to extend.

---

## 🛠️ Tech Stack

- **Framework:** NestJS v11
- **Language:** TypeScript
- **Runtime:** Node.js + Express
- **Validation:** class-validator & class-transformer
- **Testing:** Jest & Supertest
