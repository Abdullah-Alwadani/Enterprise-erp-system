from datetime import UTC, datetime, timedelta
from decimal import Decimal

from app.database import Base, SessionLocal, engine
from app.models import (
    AuditLog,
    Customer,
    Department,
    Employee,
    Invoice,
    Notification,
    Payment,
    Product,
    ProductCategory,
    PurchaseOrder,
    PurchaseOrderItem,
    PurchaseRequest,
    PurchaseRequestItem,
    Role,
    SalesOrder,
    SalesOrderItem,
    Supplier,
    User,
)
from app.services.security import get_password_hash
from app.utils.roles import SYSTEM_ROLES

DEFAULT_DEMO_PASSWORD = "password123"
ADMIN_DEMO_PASSWORD = "admin123"


def utc_now() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)


def get_or_create(db, model, defaults: dict | None = None, **filters):
    record = db.query(model).filter_by(**filters).first()
    if record:
        return record
    record = model(**filters, **(defaults or {}))
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def reset_database() -> None:
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)


def seed_roles(db) -> dict[str, Role]:
    descriptions = {
        "Admin": "Full system access",
        "HR Manager": "Employee and department management",
        "Inventory Manager": "Product and stock management",
        "Procurement Officer": "Supplier and purchasing workflows",
        "Sales Officer": "Customer and sales workflows",
        "Finance Officer": "Invoices, payments, and finance workflows",
        "Viewer": "Read-only reporting access",
    }
    return {
        name: get_or_create(db, Role, name=name, defaults={"description": descriptions[name]})
        for name in SYSTEM_ROLES
    }


def seed_users(db, roles: dict[str, Role]) -> dict[str, User]:
    user_specs = {
        "admin": ("admin@erp.com", "System Administrator", "Admin", ADMIN_DEMO_PASSWORD, True),
        "hr": ("hr@erp.com", "Mariam Al-Harbi", "HR Manager", DEFAULT_DEMO_PASSWORD, False),
        "inventory": ("inventory@erp.com", "Faisal Al-Qahtani", "Inventory Manager", DEFAULT_DEMO_PASSWORD, False),
        "procurement": ("procurement@erp.com", "Noura Al-Salem", "Procurement Officer", DEFAULT_DEMO_PASSWORD, False),
        "sales": ("sales@erp.com", "Omar Al-Fahad", "Sales Officer", DEFAULT_DEMO_PASSWORD, False),
        "finance": ("finance@erp.com", "Layla Al-Mansour", "Finance Officer", DEFAULT_DEMO_PASSWORD, False),
        "viewer": ("viewer@erp.com", "Read Only User", "Viewer", DEFAULT_DEMO_PASSWORD, False),
    }
    return {
        key: get_or_create(
            db,
            User,
            email=email,
            defaults={
                "full_name": full_name,
                "hashed_password": get_password_hash(password),
                "role_id": roles[role_name].id,
                "is_superuser": is_superuser,
            },
        )
        for key, (email, full_name, role_name, password, is_superuser) in user_specs.items()
    }


def seed_departments(db) -> list[Department]:
    specs = [
        ("Human Resources", "Recruitment, payroll coordination, and employee records"),
        ("Inventory", "Warehousing, stock control, and product catalog management"),
        ("Procurement", "Supplier relations, purchasing, and approvals"),
        ("Sales", "Customer management, orders, and revenue operations"),
        ("Finance", "Invoicing, payments, and financial controls"),
    ]
    return [get_or_create(db, Department, name=name, defaults={"description": description}) for name, description in specs]


def seed_employees(db, departments: list[Department]) -> list[Employee]:
    names = [
        ("EMP-001", "Sara", "Ahmed", "HR Business Partner", 0),
        ("EMP-002", "Omar", "Khalid", "Recruitment Specialist", 0),
        ("EMP-003", "Layla", "Hassan", "Training Coordinator", 0),
        ("EMP-004", "Faisal", "Nasser", "Warehouse Supervisor", 1),
        ("EMP-005", "Huda", "Saleh", "Inventory Analyst", 1),
        ("EMP-006", "Yousef", "Adel", "Stock Controller", 1),
        ("EMP-007", "Noura", "Saeed", "Procurement Lead", 2),
        ("EMP-008", "Rakan", "Majed", "Supplier Coordinator", 2),
        ("EMP-009", "Amani", "Yasser", "Purchasing Officer", 2),
        ("EMP-010", "Khalid", "Farhan", "Sales Manager", 3),
        ("EMP-011", "Reema", "Othman", "Account Executive", 3),
        ("EMP-012", "Maha", "Ibrahim", "Customer Success Lead", 3),
        ("EMP-013", "Abdulaziz", "Rashid", "Finance Controller", 4),
        ("EMP-014", "Dana", "Tariq", "Accounts Receivable Analyst", 4),
        ("EMP-015", "Ziad", "Hamdan", "Treasury Specialist", 4),
    ]
    employees = []
    for index, (code, first, last, title, department_index) in enumerate(names):
        employees.append(
            get_or_create(
                db,
                Employee,
                employee_code=code,
                defaults={
                    "first_name": first,
                    "last_name": last,
                    "email": f"{first.lower()}.{last.lower()}@erp.com",
                    "phone": f"+96650000{index + 1:04d}",
                    "job_title": title,
                    "hire_date": (utc_now() - timedelta(days=30 * (index + 2))).date(),
                    "department_id": departments[department_index].id,
                },
            )
        )
    return employees


def seed_inventory(db, suppliers: list[Supplier]) -> tuple[list[ProductCategory], list[Product]]:
    category_specs = [
        ("IT Hardware", "Laptops, monitors, network devices, and accessories"),
        ("Office Supplies", "Consumables used across administrative teams"),
        ("Warehouse Equipment", "Operational tools and storage equipment"),
        ("Software Licenses", "Business software subscriptions and license inventory"),
        ("Facility Supplies", "Workplace maintenance and facility items"),
    ]
    categories = [
        get_or_create(db, ProductCategory, name=name, defaults={"description": description})
        for name, description in category_specs
    ]
    product_specs = [
        ("IT-LAP-001", "Business Laptop 14 inch", 4200, 18, 6, 0, 0),
        ("IT-MON-002", "27 inch Docking Monitor", 1350, 22, 8, 0, 1),
        ("IT-DOC-003", "USB-C Docking Station", 620, 9, 10, 0, 2),
        ("IT-RTR-004", "Branch Office Router", 980, 4, 5, 0, 3),
        ("OFF-PPR-005", "A4 Printer Paper Box", 110, 85, 25, 1, 4),
        ("OFF-PEN-006", "Executive Pen Set", 38, 140, 40, 1, 5),
        ("OFF-CHA-007", "Ergonomic Office Chair", 760, 13, 10, 1, 6),
        ("OFF-DSK-008", "Adjustable Work Desk", 1850, 6, 5, 1, 6),
        ("WH-PAL-009", "Heavy Duty Pallet Jack", 3100, 3, 2, 2, 7),
        ("WH-SCN-010", "Barcode Scanner", 870, 7, 6, 2, 0),
        ("WH-BIN-011", "Storage Bin Set", 145, 44, 20, 2, 1),
        ("WH-LBL-012", "Thermal Label Rolls", 95, 15, 30, 2, 2),
        ("SW-ERP-013", "ERP User License", 280, 50, 15, 3, 3),
        ("SW-SEC-014", "Endpoint Security License", 190, 70, 20, 3, 4),
        ("SW-BI-015", "Business Intelligence License", 410, 16, 10, 3, 5),
        ("SW-CRM-016", "CRM Seat License", 240, 28, 12, 3, 6),
        ("FAC-CLE-017", "Facility Cleaning Kit", 220, 11, 10, 4, 7),
        ("FAC-LGT-018", "LED Panel Light", 145, 17, 12, 4, 0),
        ("FAC-CAF-019", "Pantry Coffee Supplies", 380, 5, 8, 4, 1),
        ("FAC-SAF-020", "Safety Signage Pack", 75, 30, 10, 4, 2),
    ]
    products = []
    for sku, name, price, qty, reorder, category_index, supplier_index in product_specs:
        products.append(
            get_or_create(
                db,
                Product,
                sku=sku,
                defaults={
                    "name": name,
                    "description": f"{name} used by enterprise operations.",
                    "unit_price": Decimal(str(price)),
                    "quantity_on_hand": qty,
                    "reorder_level": reorder,
                    "category_id": categories[category_index].id,
                    "supplier_id": suppliers[supplier_index % len(suppliers)].id,
                    "status": "low_stock" if qty <= reorder else "active",
                },
            )
        )
    return categories, products


def seed_suppliers(db) -> list[Supplier]:
    specs = [
        ("Global Tech Supply", "Nadia Saleh", "nadia@globaltech.example", "+966510000001", "Riyadh"),
        ("OfficeSource Arabia", "Fahad Omar", "fahad@officesource.example", "+966510000002", "Jeddah"),
        ("Warehouse Pro", "Mona Yasin", "mona@warehousepro.example", "+966510000003", "Dammam"),
        ("SecureSoft ME", "Hassan Tariq", "hassan@securesoft.example", "+966510000004", "Riyadh"),
        ("Facility Direct", "Reem Khaled", "reem@facilitydirect.example", "+966510000005", "Khobar"),
        ("DigitalWorks", "Majed Sami", "majed@digitalworks.example", "+966510000006", "Riyadh"),
        ("Logistics Plus", "Abeer Salem", "abeer@logisticsplus.example", "+966510000007", "Jeddah"),
        ("Gulf Maintenance", "Yara Adel", "yara@gulfmaintenance.example", "+966510000008", "Dammam"),
    ]
    return [
        get_or_create(
            db,
            Supplier,
            name=name,
            defaults={"contact_name": contact, "email": email, "phone": phone, "address": address},
        )
        for name, contact, email, phone, address in specs
    ]


def seed_customers(db) -> list[Customer]:
    specs = [
        "Acme Enterprises",
        "Riyadh Retail Group",
        "Gulf Manufacturing Co.",
        "Blue Horizon Logistics",
        "Nour Health Services",
        "Smart City Solutions",
        "Falcon Hospitality",
        "Desert Cloud Systems",
        "Eastern Trading House",
        "Capital Education Group",
    ]
    customers = []
    for index, name in enumerate(specs, start=1):
        customers.append(
            get_or_create(
                db,
                Customer,
                name=name,
                defaults={
                    "contact_name": f"Customer Contact {index}",
                    "email": f"customer{index}@example.com",
                    "phone": f"+96652000{index:04d}",
                    "address": "Saudi Arabia",
                },
            )
        )
    return customers


def seed_procurement(db, suppliers: list[Supplier], products: list[Product]) -> tuple[list[PurchaseRequest], list[PurchaseOrder]]:
    statuses = ["pending", "approved", "pending", "rejected", "approved", "pending", "approved", "draft"]
    requests = []
    for index, status in enumerate(statuses, start=1):
        product = products[index % len(products)]
        request = get_or_create(
            db,
            PurchaseRequest,
            request_number=f"PR-{index:04d}",
            defaults={
                "requested_by": ["Inventory Manager", "HR Manager", "Facility Coordinator"][index % 3],
                "needed_by": utc_now() + timedelta(days=7 + index),
                "notes": f"Procurement request for {product.name}",
                "status": status,
            },
        )
        get_or_create(
            db,
            PurchaseRequestItem,
            purchase_request_id=request.id,
            product_id=product.id,
            defaults={"quantity": 2 + index, "estimated_unit_cost": product.unit_price},
        )
        requests.append(request)

    order_statuses = ["issued", "received", "issued", "draft", "received", "issued"]
    orders = []
    for index, status in enumerate(order_statuses, start=1):
        product = products[(index * 2) % len(products)]
        quantity = 3 + index
        total = Decimal(quantity) * product.unit_price
        order = get_or_create(
            db,
            PurchaseOrder,
            order_number=f"PO-{index:04d}",
            defaults={
                "supplier_id": suppliers[index % len(suppliers)].id,
                "purchase_request_id": requests[index % len(requests)].id,
                "order_date": utc_now() - timedelta(days=index * 3),
                "total_amount": total,
                "status": status,
            },
        )
        get_or_create(
            db,
            PurchaseOrderItem,
            purchase_order_id=order.id,
            product_id=product.id,
            defaults={"quantity": quantity, "unit_cost": product.unit_price},
        )
        orders.append(order)
    return requests, orders


def seed_sales_finance(db, customers: list[Customer], products: list[Product]) -> tuple[list[SalesOrder], list[Invoice], list[Payment]]:
    sales_statuses = ["confirmed", "delivered", "draft", "confirmed", "delivered", "confirmed", "delivered", "draft"]
    orders = []
    for index, status in enumerate(sales_statuses, start=1):
        product = products[(index * 3) % len(products)]
        quantity = 1 + (index % 4)
        total = Decimal(quantity) * product.unit_price
        order = get_or_create(
            db,
            SalesOrder,
            order_number=f"SO-{index:04d}",
            defaults={
                "customer_id": customers[index % len(customers)].id,
                "order_date": utc_now() - timedelta(days=35 - index * 3),
                "total_amount": total,
                "notes": f"Sales order for {product.name}",
                "status": status,
            },
        )
        get_or_create(
            db,
            SalesOrderItem,
            sales_order_id=order.id,
            product_id=product.id,
            defaults={"quantity": quantity, "unit_price": product.unit_price},
        )
        orders.append(order)

    invoice_statuses = ["paid", "unpaid", "partially_paid", "paid", "overdue", "unpaid", "paid", "partially_paid", "unpaid", "paid"]
    invoices = []
    payments = []
    for index, status in enumerate(invoice_statuses, start=1):
        order = orders[(index - 1) % len(orders)]
        amount = order.total_amount + Decimal(index * 125)
        invoice = get_or_create(
            db,
            Invoice,
            invoice_number=f"INV-{index:04d}",
            defaults={
                "sales_order_id": order.id,
                "invoice_date": utc_now() - timedelta(days=25 - index),
                "due_date": utc_now() + timedelta(days=5 + index),
                "total_amount": amount,
                "status": status,
            },
        )
        invoices.append(invoice)
        if index <= 8:
            paid_amount = amount if status == "paid" else (amount / Decimal("2")).quantize(Decimal("0.01"))
            payments.append(
                get_or_create(
                    db,
                    Payment,
                    payment_number=f"PAY-{index:04d}",
                    defaults={
                        "invoice_id": invoice.id,
                        "payment_date": utc_now() - timedelta(days=10 - index),
                        "amount": paid_amount,
                        "method": ["Bank Transfer", "Credit Card", "Cash"][index % 3],
                        "status": "completed",
                    },
                )
            )
    return orders, invoices, payments


def seed_activity(db, users: dict[str, User]) -> None:
    activities = [
        ("login", "authentication", "User", users["admin"].id, "Admin signed in"),
        ("create", "hr", "Employee", 1, "Employee record created"),
        ("update", "inventory", "Product", 3, "Stock level updated"),
        ("approve", "procurement", "PurchaseRequest", 2, "Purchase request approved"),
        ("confirm", "sales", "SalesOrder", 1, "Sales order confirmed"),
        ("mark_paid", "finance", "Invoice", 1, "Invoice marked as paid"),
        ("read", "notifications", "Notification", 1, "Notification read"),
        ("export", "reports", "SalesReport", None, "Sales report reviewed"),
    ]
    for index, (action, module, entity, entity_id, details) in enumerate(activities, start=1):
        get_or_create(
            db,
            AuditLog,
            id=index,
            defaults={
                "user_id": users["admin"].id,
                "action": action,
                "module": module,
                "entity_name": entity,
                "entity_id": entity_id,
                "details": details,
            },
        )

    notification_specs = [
        ("Low stock alert", "Several products are below reorder level.", "warning"),
        ("Purchase approval needed", "Three purchase requests are pending review.", "approval"),
        ("Invoice follow-up", "Unpaid invoices require finance review.", "finance"),
        ("Dashboard data refreshed", "ERP analytics are using the latest SQLite seed data.", "system"),
    ]
    for title, message, notification_type in notification_specs:
        get_or_create(
            db,
            Notification,
            user_id=users["admin"].id,
            title=title,
            defaults={"message": message, "notification_type": notification_type, "status": "unread"},
        )


def run_seed() -> None:
    reset_database()
    db = SessionLocal()
    try:
        roles = seed_roles(db)
        users = seed_users(db, roles)
        departments = seed_departments(db)
        seed_employees(db, departments)
        suppliers = seed_suppliers(db)
        _, products = seed_inventory(db, suppliers)
        customers = seed_customers(db)
        seed_procurement(db, suppliers, products)
        seed_sales_finance(db, customers, products)
        seed_activity(db, users)
    finally:
        db.close()
    print("SQLite seed complete: backend/erp.db is ready.")
    print("Demo login: admin@erp.com / admin123")


if __name__ == "__main__":
    run_seed()
