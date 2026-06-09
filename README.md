# ⚖️ Legal Document Search Portal — Full Stack

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Setup & Installation](#setup--installation)
- [Run with Docker Compose](#run-with-docker-compose)
- [More Details](#more-details)

---

## Project Overview

Legal Document Search Portal is a full-stack web application that lets users search and retrieve ranked, summarized results from a legal document corpus. Users type a natural language query into a clean, focused UI and instantly see the most relevant legal documents scored by keyword relevance. The backend exposes a REST API built with Node.js and Express, handling request validation, rate limiting, and document scoring. The frontend is a React single-page application with a 4-state UI — idle, loading, success, and error — designed for legal professionals who need fast, precise results without distraction.

---

## Tech Stack

| Part     | Technology                                                                                                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Backend  | Node.js 20, Express 5 _(via [`create-express-new-project`](https://www.npmjs.com/package/create-express-new-project)) — my own backend scaffolding package_, TypeScript 5, Zod 3 |
| Frontend | React 19, TypeScript 5, Vite 8, Tailwind CSS v4                                                                                                                                  |
| HTTP     | Axios (typed client)                                                                                                                                                             |
| Serve    | Docker — nginx (frontend), node (backend)                                                                                                                                        |

> **Note on framework choice:** I used Express.js bootstrapped with my own package **`create-express-new-project`** — an NPM package I built and published myself for rapid, opinionated backend project setup. It generates the full project structure (routing, error handling, middleware, TypeScript config) in one command within seconds. This is intentional — the architecture and patterns are production-standard regardless of the scale of the project.

---

## Repository Structure

```
Search_Portal_Full_Stack/
├── backend_doc_search_portal/   # Express REST API
├── frontend_doc_search_portal/  # React + Vite SPA
├── docker-compose.yml           # Full-stack compose file
└── README.md
```

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/MozzammelRidoy/Search_Portal_Full_Stack.git
cd Search_Portal_Full_Stack
```

### 2. Configure backend environment

```bash
cp backend_doc_search_portal/.env.example backend_doc_search_portal/.env
```

Minimum required values in `backend_doc_search_portal/.env`:

```env
PORT=5000
NODE_ENV=production
CLIENT_SIDE_URL=http://localhost:80
BACKEND_SIDE_URL=http://localhost:5000
```

---

## Run with Docker Compose

### Run full stack (backend + frontend together)

```bash
docker compose up --build
```

| Service  | URL                   |
| -------- | --------------------- |
| Frontend | http://localhost:80   |
| Backend  | http://localhost:5000 |

### Run backend only

```bash
docker compose up --build backend
```

### Run frontend only

```bash
docker compose up --build frontend
```

### Stop all containers

```bash
docker compose down
```

> `VITE_API_BASE_URL` is baked into the frontend image at build time. To target a different backend host or port, update `VITE_API_BASE_URL` in `docker-compose.yml` before running `--build`.

---

## More Details

Full documentation for each service — architecture, API reference, environment variables, and more:

- **Backend** → [backend_doc_search_portal](https://github.com/MozzammelRidoy/Search_Portal_Full_Stack/blob/main/backend_doc_search_portal/README.md)
- **Frontend** → [frontend_doc_search_portal](https://github.com/MozzammelRidoy/Search_Portal_Full_Stack/tree/main/frontend_doc_search_portal/README.md)

---

## 👤 Author

**Mozzammel Ridoy**

- GitHub: [@MozzammelRidoy](https://github.com/MozzammelRidoy)
- Package: [`create-express-new-project`](https://www.npmjs.com/package/create-express-new-project)
