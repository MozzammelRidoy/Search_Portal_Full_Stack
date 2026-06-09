# ⚖️ Legal Document Search Portal — Frontend

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [UI Architecture](#ui-architecture)
- [Features](#features)
- [Setup & Installation](#setup--installation)
- [Docker](#docker)
- [NPM Scripts](#npm-scripts)
- [Environment Variables](#environment-variables)

---

## Project Overview

Frontend for a legal document search portal — lets users query a legal document corpus and instantly see ranked, summarized results.

Built with **React + TypeScript + Vite + Tailwind CSS v4**, communicating with the REST API via a typed Axios client.

---

## Tech Stack

| Layer            | Technology                                                     |
| ---------------- | -------------------------------------------------------------- |
| Framework        | React 19 + TypeScript 5                                        |
| Build Tool       | Vite 8                                                         |
| Styling          | Tailwind CSS v4 (CSS-first config, `@tailwindcss/vite` plugin) |
| HTTP Client      | Axios 1 (typed responses, 4-branch error normalization)        |
| Fonts            | Fraunces (serif headings) + Inter (body/UI) via `@fontsource`  |
| Containerization | Docker — multi-stage build → nginx static serve                |

---

## Project Structure

```
src/
├── api/
│   ├── client.ts           # Axios instance — reads VITE_API_BASE_URL from env
│   └── legalSearch.ts      # generate() call + 4-branch error handling
├── components/
│   ├── SearchBar.tsx        # Controlled input, Enter-to-submit, disabled states
│   ├── ResultCard.tsx       # Single result — staggered fade-in, ID badge
│   ├── ResultList.tsx       # Result count header + card grid
│   ├── LoadingState.tsx     # 3 skeleton cards (mirrors result layout)
│   ├── ErrorState.tsx       # Error message + "Try again" button
│   └── EmptyState.tsx       # Idle state — 3 example-query chips
├── types/
│   └── index.ts             # LegalResult, GenerateResponse, RequestStatus
├── App.tsx                  # Page composition + state machine
├── main.tsx                 # React root mount + font imports
├── index.css                # Tailwind v4 directives + @theme tokens + keyframes
└── vite-env.d.ts            # import.meta.env type declarations
```

---

## UI Architecture

Single `RequestStatus` state machine in `App.tsx`:

```
RequestStatus = "idle" | "loading" | "success" | "error"
```

```
User lands
    │
    ▼
 [idle] ──── EmptyState (example query chips)
    │
    │  user submits query
    ▼
[loading] ── LoadingState (3 skeleton cards)
    │
    ├──── API error ──▶ [error] ── ErrorState (message + retry button)
    │                                  │
    │                        user clicks "Try again"
    │                                  │
    └──── API success ──▶ [success] ── ResultList (ResultCards with staggered fade-in)
```

---

## Features

- **4-state UI** — idle, loading, error, success
- **Skeleton loading** — 3 skeleton cards mirror result layout
- **Staggered card fade-in** — 80ms per card; respects `prefers-reduced-motion`
- **Axios error normalization** — timeout, server error, no response, fallback
- **Example query chips** — populate input and trigger search immediately
- **Environment-driven API URL** — no hardcoded URLs; reads `VITE_API_BASE_URL`
- **Responsive** — down to ~360px mobile width

---

## Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/MozzammelRidoy/Search_Portal_Full_Stack.git
cd Search_Portal_Full_Stack/frontend_doc_search_portal
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

`.env` values:

```env
VITE_API_BASE_URL=http://localhost:5000/v1/api
VITE_API_TIMEOUT=10000
```

> Change `VITE_API_BASE_URL` if the backend runs on a different host or port.

### 4. Start dev server

```bash
npm run dev
```

App available at `http://localhost:5173`

### 5. Production build

```bash
npm run build
npm run preview
```

---

## Docker

Multi-stage build — Vite compiles to static files, nginx serves them.

```bash
docker build \
  --build-arg VITE_API_BASE_URL=http://localhost:5000/v1/api \
  -t legal-doc-frontend .

docker run -p 80:80 legal-doc-frontend
```

> `VITE_*` env vars are baked at **build time**. Pass `VITE_API_BASE_URL` as a build arg.

App available at `http://localhost:80`

---

## NPM Scripts

| Script            | Description                                         |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Start Vite dev server at `http://localhost:5173`    |
| `npm run build`   | TypeScript check + Vite production build to `dist/` |
| `npm run preview` | Preview the production build locally                |

---

## Environment Variables

| Variable            | Default | Description                     |
| ------------------- | ------- | ------------------------------- |
| `VITE_API_BASE_URL` | —       | Backend base URL (**required**) |
| `VITE_API_TIMEOUT`  | `10000` | Axios request timeout in ms     |

> `.env` is gitignored. Commit `.env.example` only.

---

## 👤 Author

**Mozzammel Ridoy**

- GitHub: [@MozzammelRidoy](https://github.com/MozzammelRidoy)
