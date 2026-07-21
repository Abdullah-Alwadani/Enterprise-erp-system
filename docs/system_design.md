# System Design

## Overview

The Enterprise ERP System is a modular full-stack application designed around common business workflows. It separates presentation, API routing, business services, ORM models, and SQLite persistence for the local MVP.

## Core Design Decisions

- React TypeScript frontend for a maintainable user interface.
- FastAPI backend for typed REST APIs and OpenAPI documentation.
- SQLAlchemy ORM for database models and relationships.
- SQLite for the local demo database, with SQLAlchemy keeping the design portable for future PostgreSQL use.
- JWT authentication for stateless API access.
- Role-based helpers for module permissions.
- Audit logging for sensitive business operations.

## Main Modules

- Authentication and role access
- Dashboard analytics
- HR
- Inventory
- Procurement
- Sales
- Finance
- Reports
- Notifications
- Audit logs

## Data Flow

```text
User action
  -> React page
  -> Axios API request
  -> FastAPI router
  -> Service/helper logic
  -> SQLAlchemy session
  -> SQLite
```

## Quality Goals

- Clear folder structure
- Reusable frontend components
- Documented API groups
- Docker-ready local environment
- Portfolio-ready README and screenshots
