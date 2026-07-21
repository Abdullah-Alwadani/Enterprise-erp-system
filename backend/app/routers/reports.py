from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import Department, Employee, Invoice, Payment, Product, PurchaseOrder, SalesOrder, User
from app.utils.roles import VIEWER

router = APIRouter(prefix="/reports", tags=["Reports"])
report_user = Depends(require_roles(VIEWER))


def serialize(record, fields: list[str]) -> dict:
    return {field: getattr(record, field) for field in fields}


@router.get("/sales")
def sales_report(status: str | None = None, start_date: datetime | None = None, end_date: datetime | None = None, db: Session = Depends(get_db), _: User = report_user):
    query = db.query(SalesOrder)
    if status:
        query = query.filter(SalesOrder.status == status)
    if start_date:
        query = query.filter(SalesOrder.created_at >= start_date)
    if end_date:
        query = query.filter(SalesOrder.created_at <= end_date)
    orders = query.all()
    return {
        "count": len(orders),
        "total": float(sum(order.total_amount for order in orders)),
        "items": [
            serialize(order, ["id", "order_number", "customer_id", "status", "total_amount"])
            for order in orders
        ],
    }


@router.get("/inventory")
def inventory_report(category: int | None = None, db: Session = Depends(get_db), _: User = report_user):
    query = db.query(Product)
    if category:
        query = query.filter(Product.category_id == category)
    products = query.all()
    return {
        "count": len(products),
        "low_stock": sum(1 for item in products if item.quantity_on_hand <= item.reorder_level),
        "items": [
            serialize(product, ["id", "sku", "name", "quantity_on_hand", "reorder_level", "category_id"])
            for product in products
        ],
    }


@router.get("/procurement")
def procurement_report(status: str | None = None, db: Session = Depends(get_db), _: User = report_user):
    query = db.query(PurchaseOrder)
    if status:
        query = query.filter(PurchaseOrder.status == status)
    orders = query.all()
    return {
        "count": len(orders),
        "total": float(sum(order.total_amount for order in orders)),
        "items": [
            serialize(order, ["id", "order_number", "supplier_id", "status", "total_amount"])
            for order in orders
        ],
    }


@router.get("/finance")
def finance_report(db: Session = Depends(get_db), _: User = report_user):
    invoice_total = db.query(func.coalesce(func.sum(Invoice.total_amount), 0)).scalar()
    payment_total = db.query(func.coalesce(func.sum(Payment.amount), 0)).scalar()
    return {"invoice_total": float(invoice_total), "payment_total": float(payment_total), "outstanding_total": float(invoice_total - payment_total)}


@router.get("/hr")
def hr_report(department: int | None = None, db: Session = Depends(get_db), _: User = report_user):
    query = db.query(Employee)
    if department:
        query = query.filter(Employee.department_id == department)
    employees = query.all()
    departments = db.query(Department).count()
    return {
        "employees": len(employees),
        "departments": departments,
        "items": [
            serialize(employee, ["id", "employee_code", "first_name", "last_name", "department_id", "status"])
            for employee in employees
        ],
    }
