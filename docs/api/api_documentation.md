# API Documentation

The Enterprise ERP System exposes REST endpoints through FastAPI. Interactive OpenAPI documentation is available at `/docs` when the API is running.

## Authentication

- `POST /auth/register`
- `POST /auth/login`
- `GET /auth/me`

## Dashboard

- `GET /dashboard/summary`
- `GET /dashboard/sales-chart`
- `GET /dashboard/inventory-chart`
- `GET /dashboard/procurement-chart`
- `GET /dashboard/finance-chart`
- `GET /dashboard/recent-activities`

## HR

- `GET /departments`
- `POST /departments`
- `GET /departments/{id}`
- `PUT /departments/{id}`
- `DELETE /departments/{id}`
- `GET /employees`
- `POST /employees`
- `GET /employees/{id}`
- `PUT /employees/{id}`
- `DELETE /employees/{id}`

## Inventory

- `GET /product-categories`
- `POST /product-categories`
- `PUT /product-categories/{id}`
- `DELETE /product-categories/{id}`
- `GET /products`
- `POST /products`
- `GET /products/low-stock`
- `GET /products/{id}`
- `PUT /products/{id}`
- `DELETE /products/{id}`

## Procurement

- `GET /suppliers`
- `POST /suppliers`
- `GET /suppliers/{id}`
- `PUT /suppliers/{id}`
- `DELETE /suppliers/{id}`
- `GET /purchase-requests`
- `POST /purchase-requests`
- `GET /purchase-requests/{id}`
- `PUT /purchase-requests/{id}`
- `POST /purchase-requests/{id}/approve`
- `POST /purchase-requests/{id}/reject`
- `GET /purchase-orders`
- `POST /purchase-orders`
- `GET /purchase-orders/{id}`
- `PUT /purchase-orders/{id}`
- `POST /purchase-orders/{id}/receive`

## Sales

- `GET /customers`
- `POST /customers`
- `GET /customers/{id}`
- `PUT /customers/{id}`
- `DELETE /customers/{id}`
- `GET /sales-orders`
- `POST /sales-orders`
- `GET /sales-orders/{id}`
- `PUT /sales-orders/{id}`
- `POST /sales-orders/{id}/confirm`
- `POST /sales-orders/{id}/deliver`

## Finance

- `GET /invoices`
- `POST /invoices`
- `GET /invoices/{id}`
- `PUT /invoices/{id}`
- `POST /invoices/{id}/mark-paid`
- `GET /payments`
- `POST /payments`
- `GET /finance/summary`

## Reports

- `GET /reports/sales`
- `GET /reports/inventory`
- `GET /reports/procurement`
- `GET /reports/finance`
- `GET /reports/hr`

## Notifications

- `GET /notifications`
- `POST /notifications/{id}/read`

## Audit Logs

- `GET /audit-logs`

## Role Permissions

- Admin: Full access to all modules and actions.
- HR Manager: HR endpoints.
- Inventory Manager: Inventory endpoints.
- Procurement Officer: Procurement endpoints.
- Sales Officer: Sales endpoints.
- Finance Officer: Finance endpoints.
- Viewer: Dashboard and report endpoints only.

## Filters

Supported query filters vary by endpoint and include:

- `status`
- `start_date`
- `end_date`
- `department`
- `category`

All create, update, delete, approve, reject, receive, confirm, deliver, read-notification, and payment creation actions create audit logs.

## Interactive Documentation

Run the backend and open:

```text
http://127.0.0.1:8000/docs
```

## Demo Authentication

Use `POST /auth/login` with a seeded account such as:

```json
{
  "email": "admin@erp.com",
  "password": "admin123"
}
```

Then pass the returned token as:

```text
Authorization: Bearer <access_token>
```
