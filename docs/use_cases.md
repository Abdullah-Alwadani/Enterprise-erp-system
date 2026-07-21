# Use Cases

## Authentication

- Actor: User
- Description: A user signs in to access the ERP system.
- Preconditions: The user has an active account and valid credentials.
- Main Flow:
  1. User opens the login page.
  2. User enters email and password.
  3. System validates credentials.
  4. System creates an access token.
  5. User is redirected to the dashboard.
- Alternate Flow: If credentials are invalid, the system displays an error and does not create a session.
- Postconditions: The user is authenticated and can access authorized modules.

## Dashboard

- Actor: Manager
- Description: A manager views operational KPIs and module summaries.
- Preconditions: The manager is authenticated and has dashboard access.
- Main Flow:
  1. Manager opens the dashboard.
  2. System retrieves KPIs, charts, alerts, and recent activity.
  3. System displays business summaries by module.
  4. Manager reviews metrics and opens relevant module details.
- Alternate Flow: If data is unavailable, the system displays empty states or fallback messages.
- Postconditions: The manager has reviewed current business performance.

## Employee Management

- Actor: HR Staff
- Description: HR staff manages employee records.
- Preconditions: HR staff is authenticated and has employee management permission.
- Main Flow:
  1. HR staff opens the employee module.
  2. HR staff creates or edits an employee record.
  3. System validates required fields.
  4. System saves the employee record.
  5. System records the action in audit logs.
- Alternate Flow: If required fields are missing, the system displays validation errors.
- Postconditions: Employee information is stored or updated.

## Department Management

- Actor: Administrator
- Description: An administrator manages departments and assigns employees.
- Preconditions: Administrator is authenticated and has department management permission.
- Main Flow:
  1. Administrator opens the department module.
  2. Administrator creates or updates a department.
  3. Administrator assigns employees to the department.
  4. System saves the department information.
  5. System updates department reporting relationships.
- Alternate Flow: If a department name already exists, the system asks for a unique name.
- Postconditions: Department records and employee assignments are updated.

## Inventory

- Actor: Inventory User
- Description: Inventory staff tracks products and stock movements.
- Preconditions: Inventory user is authenticated and has inventory access.
- Main Flow:
  1. Inventory user opens the inventory module.
  2. Inventory user creates or updates a product record.
  3. Inventory user records a stock movement.
  4. System updates stock quantity.
  5. System checks reorder levels and creates alerts if needed.
- Alternate Flow: If stock movement would create invalid stock levels, the system blocks the action.
- Postconditions: Inventory records and stock balances are updated.

## Suppliers

- Actor: Procurement Staff
- Description: Procurement staff manages supplier records.
- Preconditions: Procurement staff is authenticated and has supplier management permission.
- Main Flow:
  1. Procurement staff opens the supplier module.
  2. Procurement staff creates or updates supplier details.
  3. System validates supplier information.
  4. System saves the supplier record.
  5. System makes the supplier available for procurement workflows.
- Alternate Flow: If supplier data is incomplete, the system displays validation errors.
- Postconditions: Supplier data is available for purchase requests and purchase orders.

## Procurement

- Actor: Procurement Staff
- Description: Procurement staff creates and tracks purchase requests and purchase orders.
- Preconditions: Procurement staff is authenticated and has procurement access.
- Main Flow:
  1. Procurement staff creates a purchase request.
  2. System routes the request for review.
  3. Authorized manager approves the request.
  4. Procurement staff creates a purchase order.
  5. System links the purchase order to a supplier.
  6. System updates procurement status.
- Alternate Flow: If the request is rejected, the system records the rejection reason and stops the purchase order workflow.
- Postconditions: Procurement records are created and current status is tracked.

## Sales

- Actor: Sales User
- Description: Sales staff manages customers and sales orders.
- Preconditions: Sales user is authenticated and has sales module access.
- Main Flow:
  1. Sales user opens the sales module.
  2. Sales user creates or selects a customer.
  3. Sales user creates a sales order.
  4. System validates order details and item availability.
  5. System saves the order and updates sales status.
- Alternate Flow: If inventory is insufficient, the system displays an availability warning.
- Postconditions: Sales order is recorded and available for follow-up workflows.

## Finance

- Actor: Finance Staff
- Description: Finance staff reviews financial records and payment-related activity.
- Preconditions: Finance staff is authenticated and has finance access.
- Main Flow:
  1. Finance staff opens the finance module.
  2. System displays financial summaries.
  3. Finance staff reviews sales, purchasing, payments, and expense records.
  4. Finance staff updates payment or finance status where authorized.
  5. System records the action in audit logs.
- Alternate Flow: If a record is locked or unauthorized, the system prevents changes.
- Postconditions: Financial records are reviewed or updated.

## Reports

- Actor: Manager
- Description: A manager generates reports for business analysis.
- Preconditions: Manager is authenticated and has report access.
- Main Flow:
  1. Manager opens the reports module.
  2. Manager selects report type and filters.
  3. System retrieves matching data.
  4. System displays report results and charts.
  5. Manager reviews or exports report output in a future workflow.
- Alternate Flow: If no data matches the filters, the system displays an empty report state.
- Postconditions: The manager has access to filtered business information.

## Notifications

- Actor: User
- Description: A user views system notifications for assigned actions and events.
- Preconditions: User is authenticated and has notifications enabled.
- Main Flow:
  1. User opens the notifications area.
  2. System displays unread and recent notifications.
  3. User opens a notification.
  4. System marks the notification as read.
  5. User follows the notification to the related module if needed.
- Alternate Flow: If there are no notifications, the system displays an empty state.
- Postconditions: Relevant notifications are reviewed and updated.

## Audit Logs

- Actor: Auditor
- Description: An auditor reviews system activity history.
- Preconditions: Auditor is authenticated and has audit log access.
- Main Flow:
  1. Auditor opens the audit logs module.
  2. Auditor filters logs by user, module, date, or action.
  3. System retrieves matching log entries.
  4. Auditor reviews action details and timestamps.
- Alternate Flow: If the auditor lacks permission, the system denies access.
- Postconditions: Audit history is reviewed for compliance or troubleshooting.
