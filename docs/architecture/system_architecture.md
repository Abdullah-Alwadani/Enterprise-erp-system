# System Architecture

## Architecture Overview

The Enterprise ERP System is designed as a layered full-stack web application. Each layer has a clear responsibility so the system remains maintainable, testable, and scalable as ERP modules are added.

```text
Frontend
   ↓
REST API
   ↓
Business Logic Layer
   ↓
Database Layer
   ↓
SQLite
```

## Frontend

The frontend is the user-facing layer of the ERP system. It is built with React and TypeScript.

Responsibilities:

- Provide screens for dashboard, HR, inventory, procurement, sales, finance, reports, settings, and administration.
- Collect user input through forms and workflow screens.
- Display validation messages, loading states, empty states, and errors.
- Render analytics charts and KPI summaries using Recharts.
- Apply consistent styling and layout using Tailwind CSS.
- Communicate with the backend through REST API requests.
- Store and send authentication tokens where appropriate.

## REST API

The REST API is the communication boundary between the frontend and backend application logic. It is built with FastAPI.

Responsibilities:

- Expose HTTP endpoints for each ERP module.
- Receive requests from the frontend.
- Validate request payloads through schemas.
- Return structured JSON responses.
- Enforce authentication and authorization before protected actions.
- Translate API requests into business service calls.
- Provide consistent error responses.

## Business Logic Layer

The business logic layer contains the rules and workflows that define how the ERP system behaves.

Responsibilities:

- Apply business rules for each module.
- Coordinate workflows such as approvals, stock movements, sales orders, and purchase orders.
- Enforce role-based actions beyond basic route protection.
- Validate business states before saving changes.
- Trigger notifications for important events.
- Create audit log records for sensitive or important actions.
- Keep route handlers thin and focused on request/response handling.

## Database Layer

The database layer manages interaction between the application and persistent storage through SQLAlchemy.

Responsibilities:

- Define ORM models for system entities.
- Manage database sessions and transactions.
- Query and persist data.
- Isolate database access from API route handlers.
- Support future migration tooling and schema evolution.
- Preserve data integrity through relationships and constraints.

## SQLite

SQLite is the relational database used for the local MVP demo. SQLAlchemy keeps the persistence layer portable so PostgreSQL can be introduced later.

Responsibilities:

- Store users, roles, employees, departments, suppliers, customers, products, orders, transactions, reports, notifications, and audit logs.
- Enforce relational integrity through primary keys, foreign keys, indexes, and constraints.
- Support analytical queries for dashboards and reports.
- Provide reliable persistent storage for business records.

## Docker Architecture

The local Docker environment runs three services:

- `backend`: FastAPI service using the SQLite demo database.
- `backend`: FastAPI service exposed on port `8000`.
- `frontend`: Vite React service exposed on port `5173`.

The backend connects to the local SQLite database file at `backend/erp.db`.

## Module Breakdown

### Authentication

Responsible for login, token-based authentication, password security, role assignment, and access control. This module protects the ERP system by ensuring users can only access authorized resources.

### Dashboard

Responsible for showing high-level KPIs, operational summaries, trends, alerts, recent activity, and module-specific performance indicators for management decision-making.

### HR

Responsible for employee records, departments, job information, employment status, and HR-related administrative data.

### Inventory

Responsible for products, stock levels, warehouses, inventory movements, low-stock alerts, reorder levels, and item availability.

### Procurement

Responsible for suppliers, purchase requests, approvals, purchase orders, receiving status, and purchasing workflow tracking.

### Sales

Responsible for customers, sales orders, invoice preparation, sales status tracking, and customer transaction history.

### Finance

Responsible for financial summaries, payment tracking, expenses, sales and purchasing financial records, and future accounting foundations such as ledgers and journal entries.

### Reporting

Responsible for operational and management reports across modules, including filters, summaries, charts, and future export options.

### Notifications

Responsible for system alerts, workflow reminders, approval notices, low-stock messages, and user-specific event notifications.

### Audit Logs

Responsible for recording important system actions such as create, update, delete, approve, reject, login, and permission-sensitive activities.

### Settings

Responsible for system configuration, organization settings, status values, role settings, permissions, and future customization options.
