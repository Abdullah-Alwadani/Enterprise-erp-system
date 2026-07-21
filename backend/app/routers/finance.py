from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import Invoice, Payment, User
from app.schemas import InvoiceCreate, InvoiceRead, InvoiceUpdate, PaymentCreate, PaymentRead
from app.services.audit import create_audit_log
from app.services.crud import create_record, get_record, list_records, update_record
from app.utils.roles import FINANCE_OFFICER

router = APIRouter(tags=["Finance"])
finance_user = Depends(require_roles(FINANCE_OFFICER))


@router.get("/invoices", response_model=list[InvoiceRead])
def list_invoices(status: str | None = None, start_date: datetime | None = None, end_date: datetime | None = None, db: Session = Depends(get_db), _: User = finance_user):
    return list_records(db, Invoice, status_value=status, start_date=start_date, end_date=end_date)


@router.post("/invoices", response_model=InvoiceRead)
def create_invoice(payload: InvoiceCreate, db: Session = Depends(get_db), user: User = finance_user):
    record = create_record(db, Invoice, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="finance", entity_name="Invoice", entity_id=record.id)
    return record


@router.get("/invoices/{id}", response_model=InvoiceRead)
def get_invoice(id: int, db: Session = Depends(get_db), _: User = finance_user):
    return get_record(db, Invoice, id)


@router.put("/invoices/{id}", response_model=InvoiceRead)
def update_invoice(id: int, payload: InvoiceUpdate, db: Session = Depends(get_db), user: User = finance_user):
    record = update_record(db, get_record(db, Invoice, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="finance", entity_name="Invoice", entity_id=record.id)
    return record


@router.post("/invoices/{id}/mark-paid", response_model=InvoiceRead)
def mark_invoice_paid(id: int, db: Session = Depends(get_db), user: User = finance_user):
    record = update_record(db, get_record(db, Invoice, id), {"status": "paid"})
    create_audit_log(db, user=user, action="mark_paid", module="finance", entity_name="Invoice", entity_id=record.id)
    return record


@router.get("/payments", response_model=list[PaymentRead])
def list_payments(status: str | None = None, start_date: datetime | None = None, end_date: datetime | None = None, db: Session = Depends(get_db), _: User = finance_user):
    return list_records(db, Payment, status_value=status, start_date=start_date, end_date=end_date)


@router.post("/payments", response_model=PaymentRead)
def create_payment(payload: PaymentCreate, db: Session = Depends(get_db), user: User = finance_user):
    record = create_record(db, Payment, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="finance", entity_name="Payment", entity_id=record.id)
    return record


@router.get("/finance/summary")
def finance_summary(db: Session = Depends(get_db), _: User = finance_user):
    invoice_total = db.query(func.coalesce(func.sum(Invoice.total_amount), 0)).scalar()
    payment_total = db.query(func.coalesce(func.sum(Payment.amount), 0)).scalar()
    open_invoices = db.query(Invoice).filter(Invoice.status != "paid").count()
    return {
        "invoice_total": float(invoice_total),
        "payment_total": float(payment_total),
        "outstanding_total": float(invoice_total - payment_total),
        "open_invoices": open_invoices,
    }
