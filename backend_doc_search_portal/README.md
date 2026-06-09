# ⚖️ Legal Document Search Portal — Backend API

## 📌 Project Overview

This is a production-grade backend service built as part of the **Acme AI Full Stack Developer assignment**. It powers a legal assistant tool that allows users to search and summarize legal documents through a clean REST API.

The backend is intentionally mock-based — no real database, no real LLM. The focus is on demonstrating **production-standard Node.js architecture**: modular separation of concerns, Zod request validation, global error handling, rate limiting, dynamic CORS, and a clean layered module system — all of which are ready to plug into a real data source.

The service exposes three endpoints:

- `POST /v1/api/generate` — searches 3 hardcoded legal documents by keyword query and returns ranked results
- `GET /health` — health check with server uptime and timestamp
- `GET /` — home route confirming server is active

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Tech Stack](#️-tech-stack)
- [System Architecture](#️-system-architecture)
- [Features](#-features)
- [Setup & Installation](#️-setup--installation)
- [Docker](#-docker)
- [Project Structure](#-project-structure)
- [API Reference](#-api-reference)
- [Test Queries](#-test-queries)
- [Postman Collection](#-postman-collection)
- [NPM Scripts](#-npm-scripts)
- [Key Packages](#-key-packages)
- [Author](#-author)

---

## 🛠️ Tech Stack

| Layer           | Technology                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Runtime         | Node.js 20                                                                                                                                      |
| Framework       | Express 5 _(via [`create-express-new-project`](https://www.npmjs.com/package/create-express-new-project) — my own backend scaffolding package)_ |
| Language        | TypeScript 5                                                                                                                                    |
| Validation      | Zod 3                                                                                                                                           |
| Rate Limiting   | awesome-rate-limiter                                                                                                                            |
| Caching         | node-cache                                                                                                                                      |
| File Upload     | Multer                                                                                                                                          |
| Email           | Nodemailer                                                                                                                                      |
| Dev Server      | ts-node-dev                                                                                                                                     |
| Package Manager | NPM                                                                                                                                             |

> **Note on framework choice:** I used Express.js bootstrapped with my own package **`create-express-new-project`** — an NPM package I built and published myself for rapid, opinionated backend project setup. It generates the full project structure (routing, error handling, middleware, TypeScript config) in one command within seconds. This is intentional — the architecture and patterns are production-standard regardless of the scale of the project.

---

## 🏗️ System Architecture

The project follows a clean **modular layered architecture**:

```
Request
  └─▶ Express App (app.ts)
        └─▶ Rate Limiter (sliding window, per IP)
              └─▶ CORS Middleware (dynamic origin check)
                    └─▶ Router (routers/index.ts)
                          └─▶ validateRequest (Zod schema)
                                └─▶ Controller
                                      └─▶ Service
                                            └─▶ Helpers (keyword scoring)
                                                  └─▶ Lib (response formatter)
                                                        └─▶ Data (hardcoded docs)
                                                              │
                                                    ┌─────────┴──────────┐
                                               Match found           No match
                                                    │                    │
                                          Ranked by score         All 3 docs
                                                    │                    │
                                              sendResponse ◀────────────┘
```

### Key Layers

- **Router** — Central route registry; wires module routes to their base paths
- **validateRequest** — Zod schema validation middleware; blocks invalid requests before they reach the controller
- **Controller** — Thin layer; receives validated request, delegates to service, returns standardized response via `sendResponse`
- **Service** — Core business logic; scores docs, sorts results, applies fallback
- **Helpers** — Pure keyword scoring function (`scoreDoc`) — isolated and testable
- **Lib** — Response shape formatter (`formatDocResult/s`) — separates data shape from business logic
- **Data** — Single source of truth for the 3 legal documents

---

## ✨ Features

### ✅ Keyword-Scored Document Search

- Query is lowercased and matched against each document's keyword list
- Score = number of keyword hits per document
- Results sorted by score descending — most relevant first
- Zero matches → all 3 documents returned as fallback (never an empty result)

### ✅ Zod Request Validation

- Rejects empty, blank (whitespace-only), or oversized queries at the middleware layer
- Returns `400` with a structured error response before business logic is ever reached
- Schema lives in `generate_validationZodSchema.ts` — separated from routing and controller

### ✅ Global Error Handler

- Single `globalErrorHandler` middleware catches all thrown errors across the app
- Handles `ZodError`, `AppError`, and generic `Error` consistently
- Returns a uniform JSON error shape with `status`, `success`, `message`, `error[]`
- Uploads are cleaned up on error automatically (Multer support built in)

### ✅ Sliding Window Rate Limiter

- 200 requests per minute per IP
- 15-minute block on breach
- Health check route is excluded from rate limiting
- Real client IP extracted from `x-forwarded-for` (proxy-aware)

### ✅ Dynamic CORS

- Origin list loaded from in-memory cache (`node-cache`)
- Cache miss → falls back to default origins
- Designed to be swapped with a real DB fetch without changing the middleware contract

### ✅ Module-Based Architecture

Each feature module is fully self-contained with its own:

```
interface → data → constant → validation → helpers → lib → service → controller → route
```

Adding a new feature = adding a new folder under `modules/` and one line in `routers/index.ts`.

---

## ⚙️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/MozzammelRidoy/Search_Portal_Full_Stack.git
cd Search_Portal_Full_Stack/backend_doc_search_portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Minimum required for local dev:

```env
PORT=5000
NODE_ENV=development
CLIENT_SIDE_URL=http://localhost:5173
BACKEND_SIDE_URL=http://localhost:5000

```

### 4. Start the dev server

```bash
npm run dev
```

Server starts at `http://localhost:5000`

### 5. Build for production

```bash
npm run build
npm start
```

---

## 🐳 Docker

```bash
docker build -t legal-doc-api .
docker run -p 5000:5000 --env-file .env legal-doc-api
```

---

## 📝 Project Structure

```
src/
├── app.ts                          # Express app, CORS, rate limiter, middleware wiring
├── server.ts                       # Server entry point, graceful shutdown
└── app/
    ├── config/index.ts             # Environment variable loader
    ├── constants/                  # Shared app-level constants
    ├── errors/
    │   ├── AppError.ts             # Custom error class with statusCode + path
    │   └── handleZodValidationError.ts
    ├── interfaces/                 # Shared TypeScript types (errors, email, etc.)
    ├── middlewares/
    │   ├── globalErrorHandler.ts   # Catches all errors, uniform JSON shape
    │   ├── validateRequest.ts      # Zod schema validation middleware
    │   ├── notFound.ts             # 404 handler
    │   ├── bigIntSerializer.ts
    │   ├── handleFileUpload.ts
    │   └── formDataToSetJSONformatData.ts
    ├── modules/
    │   └── generate/               # Legal document search feature module
    │       ├── generate_interface.ts        # TLegalDoc, TDocResult, TGenerateResponse
    │       ├── generate_data.ts             # 3 hardcoded legal documents
    │       ├── generate_constant.ts         # Error/success messages, validation limits
    │       ├── generate_validationZodSchema.ts  # Zod schema for POST body
    │       ├── generate_helpers.ts          # scoreDoc() — keyword hit counter
    │       ├── generate_lib.ts              # formatDocResult/s() — response shaper
    │       ├── generate_service.ts          # search_LegalDocs() — scoring + fallback
    │       ├── generate_controller.ts       # catchAsync handler → sendResponse
    │       └── generate_route.ts            # POST / with validateRequest
    ├── routers/index.ts            # Central module route registry
    └── utils/
        ├── sendResponse.ts         # Standardized JSON response helper
        ├── catchAsync.ts           # Async error wrapper (eliminates try/catch)
        ├── node_cache.ts           # In-memory cache helpers
        ├── logger.ts
        ├── sendEmail.ts
        ├── commonUtils.ts
        └── removeUploadedFiles.ts
```

---

## 🔌 API Reference

### Base URL

```
http://localhost:5000
```

---

### `POST /v1/api/generate`

Search legal documents by keyword query. Returns ranked results based on keyword hit score.

**Request**

```http
POST /v1/api/generate
Content-Type: application/json
```

```json
{ "query": "contract breach" }
```

**Success Response `200`**

```json
{
  "status": 200,
  "success": true,
  "message": "Legal documents searched successfully",
  "data": {
    "query": "contract breach",
    "results": [
      {
        "id": 1,
        "title": "Contract Law - Breach of Agreement",
        "summary": "A breach of contract occurs when one party fails to fulfill their obligations under a legally binding agreement..."
      }
    ],
    "total": 1
  }
}
```

**Validation Error `400`** — empty or blank query

```json
{
  "status": 400,
  "success": false,
  "message": "Query cannot be empty",
  "error": [{ "path": "body.query", "message": "Query cannot be empty" }]
}
```

**Search logic:**

| Scenario                  | Behaviour                                            |
| ------------------------- | ---------------------------------------------------- |
| Query matches keywords    | Returns matched docs sorted by score (highest first) |
| Query matches no keywords | Returns all 3 docs as fallback                       |
| Empty / blank query       | Rejected at validation layer — `400` returned        |
| Query > 500 chars         | Rejected at validation layer — `400` returned        |

---

### `GET /health`

```http
GET /health
```

```json
{
  "status": "OK",
  "timestamp": "2026-06-09T17:00:00.000Z",
  "uptime": 42.3
}
```

> Health route is excluded from rate limiting.

---

### `GET /`

```json
{
  "server": "Active",
  "success": true,
  "status": 200,
  "message": "This is Home Route.",
  "timestamp": "2026-06-09T17:00:00.000Z"
}
```

---

## 🧪 Test Queries

Four test scenarios cover the full search behaviour:

| #   | Description                                                | Expected Result                      |
| --- | ---------------------------------------------------------- | ------------------------------------ |
| 1   | **Keyword match** — `"contract breach"`                    | Returns 1 matched doc (contract law) |
| 2   | **Multi-keyword match** — `"penalty crime breach damages"` | Returns docs 1 & 3 ranked by score   |
| 3   | **No match** — `"zzz nothing here"`                        | Fallback — all 3 docs returned       |
| 4   | **Empty query** — `""`                                     | `400` validation error               |
| 5   | **Property match** — `"land deed ownership"`               | Returns 1 matched doc (property law) |

---

### Postman — Raw Body (JSON)

Uncomment one `"query"` line at a time and send to `POST /v1/api/generate`:

```json
{
  // "query" : "contract breach"
  // "query" : "zzz nothing here"
  // "query" : ""
  // "query" : "land deed ownership"
  "query": "penalty crime breach damages"
}
```

> In Postman set **Body → raw → JSON**. Comments are stripped automatically before the request is sent.

---

## 📬 Postman Collection

Download the full Postman collection to test all endpoints instantly — no manual setup needed.

[![Download Postman Collection](https://img.shields.io/badge/Postman-Download%20Collection-orange?logo=postman)](https://drive.google.com/file/d/1VAw5at2IyKVlRpzoWPSbMKiOMor8MmvB/view?usp=sharing)

**Steps:**

1. Download the `.json` file from the link above
2. Open Postman → **Import** → select the downloaded file
3. Set the `base_url` variable to `http://localhost:5000`
4. Run any request

---

## 📦 NPM Scripts

| Script             | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start dev server with hot reload (`ts-node-dev`) |
| `npm run build`    | Compile TypeScript to `dist/`                    |
| `npm start`        | Run compiled production build                    |
| `npm run lint`     | Run ESLint                                       |
| `npm run lint:fix` | Auto-fix lint issues                             |
| `npm run prettier` | Format all source files                          |

---

## 📦 Key Packages

| Package                | Purpose                                |
| ---------------------- | -------------------------------------- |
| `express`              | HTTP framework                         |
| `cors`                 | Cross-origin request handling          |
| `zod`                  | Schema-based request validation        |
| `awesome-rate-limiter` | Sliding window rate limiting per IP    |
| `cookie-parser`        | Cookie parsing middleware              |
| `node-cache`           | In-memory caching (CORS origins, etc.) |
| `multer`               | Multipart file upload handling         |
| `nodemailer`           | Email sending                          |
| `dotenv`               | Environment variable loading           |
| `ts-node-dev`          | TypeScript dev server with hot reload  |

---

## 👤 Author

**Mozzammel Ridoy**

- GitHub: [@MozzammelRidoy](https://github.com/MozzammelRidoy)
- Package: [`create-express-new-project`](https://www.npmjs.com/package/create-express-new-project)
