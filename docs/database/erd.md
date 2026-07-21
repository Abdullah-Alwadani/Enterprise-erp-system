# Entity Relationship Design

## Main Entities

- Role: Defines access category for users.
- User: Authenticated account connected to one role.
- Department: Organizational unit.
- Employee: Staff record connected to one department.
- Supplier: Vendor used in procurement.
- Customer: Customer used in sales.
- ProductCategory: Product grouping.
- Product: Inventory item connected to one category and optionally one supplier.
- PurchaseRequest: Internal procurement request.
- PurchaseRequestItem: Requested product quantity.
- PurchaseOrder: Supplier order connected to a supplier and optionally a purchase request.
- PurchaseOrderItem: Ordered product quantity and cost.
- SalesOrder: Customer order.
- SalesOrderItem: Sold product quantity and price.
- Invoice: Billing record connected to one sales order.
- Payment: Payment record connected to one invoice.
- Notification: User-specific system message.
- AuditLog: Trace record for important system actions.

## Key Relationships

```text
Role 1 -> many Users
Department 1 -> many Employees
ProductCategory 1 -> many Products
Supplier 1 -> many Products
Supplier 1 -> many PurchaseOrders
Customer 1 -> many SalesOrders
PurchaseRequest 1 -> many PurchaseRequestItems
PurchaseOrder 1 -> many PurchaseOrderItems
SalesOrder 1 -> many SalesOrderItems
SalesOrder 1 -> 1 Invoice
Invoice 1 -> many Payments
User 1 -> many Notifications
User 1 -> many AuditLogs
```

Reference SQL is available in [../../database/schema.sql](../../database/schema.sql).
