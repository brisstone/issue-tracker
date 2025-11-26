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



# Architecture Notes & Trade-offs

## **Key Technical Decisions**

### **1. Framework & Database Choice**
- **NestJS** for structured backend architecture with dependency injection
- **Prisma + PostgreSQL** for type-safe database operations and migrations
- **Trade-off**: Prisma adds build complexity but provides better type safety and development speed, code readability, and experience

### **2. Database Schema Management**
- Split Prisma models into domain-specific files (Issue, etc.)
- **Trade-off**: More initial setup but scales better with complex schemas

### **3. Backend Testing Strategy**
- Test-driven development focusing on error cases first
- **Trade-off**: Slower start but fewer production bugs

### **4. Efficient Data Loading**
- Server-side pagination, search, and filtering
- **Why**: Prevents loading thousands of records as data grows
- **Trade-off**: More complex API but essential for real-world performance

### **5. Frontend Component Architecture**
- Reusable UI components (Button, Modal, IssueList, etc.)
- **Why**: Mirrors production design systems and enables testing
- **Trade-off**: More boilerplate but better maintainability

### **6. Data Fetching with React Query**
- Handles caching, loading states, and automatic refetching
- **Trade-off**: Extra setup needed but reduces API boilerplate significantly

### **7. Search Performance**
- 300ms debounced search to avoid API spam
- **Trade-off**: Slight delay but standard UX practice

### **8. Consistent Error Handling**
- Unified Prisma error utility for predictable API responses
- **Trade-off**: Requires understanding Prisma internals but cleaner code

## **Future Improvements**

### **Short-term Priorities**
1. **Sorting** by date, title, status
2. **User authentication** with JWT
3. **End-to-end tests** with Playwright
4. **Storybook documentation** for all components
5. **Design system** with consistent tokens
6.  **Caching** implementation
7. **State management** implementation of context or redux

### **Medium-term Enhancements**
6. **Bulk operations** for mass updates or edits
7. **Real-time updates** via WebSockets
8. **Advanced search** with PostgreSQL full-text
9. **Docker setup** for easy local development
10. **CI pipeline** with more automated testing
