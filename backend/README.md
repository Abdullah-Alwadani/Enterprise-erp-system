# Enterprise ERP System Backend

FastAPI backend for the Enterprise ERP System MVP. It uses SQLite at `backend/erp.db`, SQLAlchemy models, JWT authentication, password hashing, role-based access helpers, CRUD APIs, dashboard analytics, and seed data.

## Installation

Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

Install dependencies from inside the `backend/` folder:

```bash
pip install -r requirements.txt
```

## Environment Variables

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Required variables:

```text
DATABASE_URL=sqlite:///./erp.db
SECRET_KEY=change-me-for-local-demo
ACCESS_TOKEN_EXPIRE_MINUTES=60
```

## Run the API

From inside the `backend/` folder:

```bash
uvicorn app.main:app --reload
```

Health check endpoint:

```bash
GET /health
```

Authentication endpoints:

```text
POST /auth/register
POST /auth/login
GET /auth/me
```

## Seed Data

Create the SQLite database and demo records:

```bash
python seed.py
```

## Demo Login Accounts

| Role | Email | Password |
| --- | --- | --- |
| Admin | admin@erp.com | admin123 |
| HR Manager | hr@erp.com | password123 |
| Inventory Manager | inventory@erp.com | password123 |
| Procurement Officer | procurement@erp.com | password123 |
| Sales Officer | sales@erp.com | password123 |
| Finance Officer | finance@erp.com | password123 |
| Viewer | viewer@erp.com | password123 |
