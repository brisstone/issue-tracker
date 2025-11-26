# 📌 Issue Tracker — Full-Stack Application

Issue management application

---

## Features

### Backend (NestJS)

* NestJS modular structure
* Prisma ORM (Prisma) + PostgreSQL
* DTO validation
* Search, filter, and pagination support
* Fully documented REST API using **Swagger**

### Frontend (React)

* React + Vite + TypeScript
* TailwindCSS UI
* React Query for data fetching and caching
* CRUD actions for issues
* Debounced search + status filter
* Pagination UI
* Reusable UI components (Modal, Button, StatusBadge, Pagination, etc.)
* Component documentation via **Storybook**

---

## Project Structure

```
issue-tracker/
├── backend/
│   ├── prisma/
│   ├── src/
│   └── prisma.config.ts
└── frontend/
    ├── src/
    ├── components/
    ├── lib/
    ├── hooks/
    └── types/
```

---

# 🏁 Getting Started

## RECOMMENDED ENGINE
"node": ">=22.12.0",
"npm": ">=10.0.0"

## Backend Setup

```bash
cd backend
pnpm install
```

Create `.env`:

```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<database>"
PORT=4000
```

Run migrations:

```bash
pnpm exec prisma migrate dev
```

Start the server:

```bash
pnpm start:dev
```

### ✔ Swagger Docs

Backend API documentation is available at:
**[http://localhost:4000/docs](http://localhost:4000/docs)**

---

## Frontend Setup

```bash
cd frontend
pnpm install
```

Create `.env`:

```
VITE_API_URL="http://localhost:4000/api/v1"
```

```bash
pnpm dev
```

App runs at:
**[http://localhost:5173](http://localhost:5173)**

### ✔ Storybook Docs

```bash
pnpm run storybook
```

Component documentation is available at:
**[http://localhost:6006](http://localhost:6006)**

---

# Testing

Backend tests:

```bash
pnpm test
```


NB; other package manager can be used e.g npm