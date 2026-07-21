from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import (
    AuditLog,
    Employee,
    Invoice,
    Payment,
    Product,
    ProductCategory,
    PurchaseOrder,
    PurchaseRequest,
    SalesOrder,
    Supplier,
    User,
)
from app.utils.roles import VIEWER

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])
dashboard_user = Depends(require_roles(VIEWER))


@router.get("/summary")
def dashboard_summary(db: Session = Depends(get_db), _: User = dashboard_user):
    return {
        "employees": db.query(Employee).count(),
        "products": db.query(Product).count(),
        "low_stock_products": db.query(Product).filter(Product.quantity_on_hand <= Product.reorder_level).count(),
        "suppliers": db.query(Supplier).count(),
        "pending_purchase_requests": db.query(PurchaseRequest).filter(PurchaseRequest.status == "pending").count(),
        "purchase_orders": db.query(PurchaseOrder).count(),
        "sales_orders": db.query(SalesOrder).count(),
        "invoices": db.query(Invoice).count(),
        "unpaid_invoices": db.query(Invoice).filter(Invoice.status != "paid").count(),
        "monthly_sales_revenue": float(db.query(func.coalesce(func.sum(SalesOrder.total_amount), 0)).scalar()),
    }


@router.get("/sales-chart")
def sales_chart(db: Session = Depends(get_db), _: User = dashboard_user):
    rows = (
        db.query(
            func.strftime("%Y-%m", SalesOrder.order_date).label("month"),
            func.count(SalesOrder.id),
            func.coalesce(func.sum(SalesOrder.total_amount), 0),
        )
        .group_by("month")
        .order_by("month")
        .all()
    )
    return [{"label": month or "Unscheduled", "count": count, "total": float(total)} for month, count, total in rows]


@router.get("/inventory-chart")
def inventory_chart(db: Session = Depends(get_db), _: User = dashboard_user):
    rows = (
        db.query(
            ProductCategory.name,
            func.count(Product.id),
            func.coalesce(func.sum(Product.quantity_on_hand), 0),
        )
        .join(Product, Product.category_id == ProductCategory.id)
        .group_by(ProductCategory.name)
        .order_by(ProductCategory.name)
        .all()
    )
    return [{"label": name, "count": count, "quantity": int(quantity)} for name, count, quantity in rows]


@router.get("/procurement-chart")
def procurement_chart(db: Session = Depends(get_db), _: User = dashboard_user):
    rows = db.query(PurchaseRequest.status, func.count(PurchaseRequest.id), func.coalesce(func.sum(PurchaseRequest.id), 0)).group_by(PurchaseRequest.status).all()
    return [{"status": status, "count": count, "total": float(total)} for status, count, total in rows]


@router.get("/finance-chart")
def finance_chart(db: Session = Depends(get_db), _: User = dashboard_user):
    rows = (
        db.query(Invoice.status, func.count(Invoice.id), func.coalesce(func.sum(Invoice.total_amount), 0))
        .group_by(Invoice.status)
        .order_by(Invoice.status)
        .all()
    )
    payment_total = db.query(func.coalesce(func.sum(Payment.amount), 0)).scalar()
    data = [{"label": status, "count": count, "total": float(total)} for status, count, total in rows]
    data.append({"label": "payments", "count": 0, "total": float(payment_total)})
    return data


@router.get("/recent-activities")
def recent_activities(db: Session = Depends(get_db), _: User = dashboard_user):
    rows = db.query(AuditLog).order_by(AuditLog.id.desc()).limit(6).all()
    return [
        {
            "id": row.id,
            "action": row.action,
            "module": row.module,
            "entity_name": row.entity_name,
            "entity_id": row.entity_id,
            "created_at": row.created_at,
        }
        for row in rows
    ]
