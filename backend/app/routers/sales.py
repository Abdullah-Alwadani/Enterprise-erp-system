from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import Customer, SalesOrder, User
from app.schemas import CustomerRead, PartnerCreate, PartnerUpdate, SalesOrderCreate, SalesOrderRead, SalesOrderUpdate
from app.services.audit import create_audit_log
from app.services.crud import create_record, get_record, list_records, soft_delete_record, update_record
from app.utils.roles import SALES_OFFICER

router = APIRouter(tags=["Sales"])
sales_user = Depends(require_roles(SALES_OFFICER))


@router.get("/customers", response_model=list[CustomerRead])
def list_customers(status: str | None = None, db: Session = Depends(get_db), _: User = sales_user):
    return list_records(db, Customer, status_value=status)


@router.post("/customers", response_model=CustomerRead)
def create_customer(payload: PartnerCreate, db: Session = Depends(get_db), user: User = sales_user):
    record = create_record(db, Customer, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="sales", entity_name="Customer", entity_id=record.id)
    return record


@router.get("/customers/{id}", response_model=CustomerRead)
def get_customer(id: int, db: Session = Depends(get_db), _: User = sales_user):
    return get_record(db, Customer, id)


@router.put("/customers/{id}", response_model=CustomerRead)
def update_customer(id: int, payload: PartnerUpdate, db: Session = Depends(get_db), user: User = sales_user):
    record = update_record(db, get_record(db, Customer, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="sales", entity_name="Customer", entity_id=record.id)
    return record


@router.delete("/customers/{id}", response_model=CustomerRead)
def delete_customer(id: int, db: Session = Depends(get_db), user: User = sales_user):
    record = soft_delete_record(db, get_record(db, Customer, id))
    create_audit_log(db, user=user, action="delete", module="sales", entity_name="Customer", entity_id=record.id)
    return record


@router.get("/sales-orders", response_model=list[SalesOrderRead])
def list_sales_orders(status: str | None = None, start_date: datetime | None = None, end_date: datetime | None = None, db: Session = Depends(get_db), _: User = sales_user):
    return list_records(db, SalesOrder, status_value=status, start_date=start_date, end_date=end_date)


@router.post("/sales-orders", response_model=SalesOrderRead)
def create_sales_order(payload: SalesOrderCreate, db: Session = Depends(get_db), user: User = sales_user):
    record = create_record(db, SalesOrder, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="sales", entity_name="SalesOrder", entity_id=record.id)
    return record


@router.get("/sales-orders/{id}", response_model=SalesOrderRead)
def get_sales_order(id: int, db: Session = Depends(get_db), _: User = sales_user):
    return get_record(db, SalesOrder, id)


@router.put("/sales-orders/{id}", response_model=SalesOrderRead)
def update_sales_order(id: int, payload: SalesOrderUpdate, db: Session = Depends(get_db), user: User = sales_user):
    record = update_record(db, get_record(db, SalesOrder, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="sales", entity_name="SalesOrder", entity_id=record.id)
    return record


@router.post("/sales-orders/{id}/confirm", response_model=SalesOrderRead)
def confirm_sales_order(id: int, db: Session = Depends(get_db), user: User = sales_user):
    record = update_record(db, get_record(db, SalesOrder, id), {"status": "confirmed"})
    create_audit_log(db, user=user, action="confirm", module="sales", entity_name="SalesOrder", entity_id=record.id)
    return record


@router.post("/sales-orders/{id}/deliver", response_model=SalesOrderRead)
def deliver_sales_order(id: int, db: Session = Depends(get_db), user: User = sales_user):
    record = update_record(db, get_record(db, SalesOrder, id), {"status": "delivered"})
    create_audit_log(db, user=user, action="deliver", module="sales", entity_name="SalesOrder", entity_id=record.id)
    return record
