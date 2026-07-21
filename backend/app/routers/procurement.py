from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import PurchaseOrder, PurchaseRequest, Supplier, User
from app.schemas import PartnerCreate, PartnerUpdate, PurchaseOrderCreate, PurchaseOrderRead, PurchaseOrderUpdate, PurchaseRequestCreate, PurchaseRequestRead, PurchaseRequestUpdate, SupplierRead
from app.services.audit import create_audit_log
from app.services.crud import create_record, get_record, list_records, soft_delete_record, update_record
from app.utils.roles import PROCUREMENT_OFFICER

router = APIRouter(tags=["Procurement"])
procurement_user = Depends(require_roles(PROCUREMENT_OFFICER))


@router.get("/suppliers", response_model=list[SupplierRead])
def list_suppliers(status: str | None = None, db: Session = Depends(get_db), _: User = procurement_user):
    return list_records(db, Supplier, status_value=status)


@router.post("/suppliers", response_model=SupplierRead)
def create_supplier(payload: PartnerCreate, db: Session = Depends(get_db), user: User = procurement_user):
    record = create_record(db, Supplier, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="procurement", entity_name="Supplier", entity_id=record.id)
    return record


@router.get("/suppliers/{id}", response_model=SupplierRead)
def get_supplier(id: int, db: Session = Depends(get_db), _: User = procurement_user):
    return get_record(db, Supplier, id)


@router.put("/suppliers/{id}", response_model=SupplierRead)
def update_supplier(id: int, payload: PartnerUpdate, db: Session = Depends(get_db), user: User = procurement_user):
    record = update_record(db, get_record(db, Supplier, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="procurement", entity_name="Supplier", entity_id=record.id)
    return record


@router.delete("/suppliers/{id}", response_model=SupplierRead)
def delete_supplier(id: int, db: Session = Depends(get_db), user: User = procurement_user):
    record = soft_delete_record(db, get_record(db, Supplier, id))
    create_audit_log(db, user=user, action="delete", module="procurement", entity_name="Supplier", entity_id=record.id)
    return record


@router.get("/purchase-requests", response_model=list[PurchaseRequestRead])
def list_purchase_requests(status: str | None = None, start_date: datetime | None = None, end_date: datetime | None = None, db: Session = Depends(get_db), _: User = procurement_user):
    return list_records(db, PurchaseRequest, status_value=status, start_date=start_date, end_date=end_date)


@router.post("/purchase-requests", response_model=PurchaseRequestRead)
def create_purchase_request(payload: PurchaseRequestCreate, db: Session = Depends(get_db), user: User = procurement_user):
    record = create_record(db, PurchaseRequest, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="procurement", entity_name="PurchaseRequest", entity_id=record.id)
    return record


@router.get("/purchase-requests/{id}", response_model=PurchaseRequestRead)
def get_purchase_request(id: int, db: Session = Depends(get_db), _: User = procurement_user):
    return get_record(db, PurchaseRequest, id)


@router.put("/purchase-requests/{id}", response_model=PurchaseRequestRead)
def update_purchase_request(id: int, payload: PurchaseRequestUpdate, db: Session = Depends(get_db), user: User = procurement_user):
    record = update_record(db, get_record(db, PurchaseRequest, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="procurement", entity_name="PurchaseRequest", entity_id=record.id)
    return record


@router.post("/purchase-requests/{id}/approve", response_model=PurchaseRequestRead)
def approve_purchase_request(id: int, db: Session = Depends(get_db), user: User = procurement_user):
    record = update_record(db, get_record(db, PurchaseRequest, id), {"status": "approved"})
    create_audit_log(db, user=user, action="approve", module="procurement", entity_name="PurchaseRequest", entity_id=record.id)
    return record


@router.post("/purchase-requests/{id}/reject", response_model=PurchaseRequestRead)
def reject_purchase_request(id: int, db: Session = Depends(get_db), user: User = procurement_user):
    record = update_record(db, get_record(db, PurchaseRequest, id), {"status": "rejected"})
    create_audit_log(db, user=user, action="reject", module="procurement", entity_name="PurchaseRequest", entity_id=record.id)
    return record


@router.get("/purchase-orders", response_model=list[PurchaseOrderRead])
def list_purchase_orders(status: str | None = None, start_date: datetime | None = None, end_date: datetime | None = None, db: Session = Depends(get_db), _: User = procurement_user):
    return list_records(db, PurchaseOrder, status_value=status, start_date=start_date, end_date=end_date)


@router.post("/purchase-orders", response_model=PurchaseOrderRead)
def create_purchase_order(payload: PurchaseOrderCreate, db: Session = Depends(get_db), user: User = procurement_user):
    record = create_record(db, PurchaseOrder, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="procurement", entity_name="PurchaseOrder", entity_id=record.id)
    return record


@router.get("/purchase-orders/{id}", response_model=PurchaseOrderRead)
def get_purchase_order(id: int, db: Session = Depends(get_db), _: User = procurement_user):
    return get_record(db, PurchaseOrder, id)


@router.put("/purchase-orders/{id}", response_model=PurchaseOrderRead)
def update_purchase_order(id: int, payload: PurchaseOrderUpdate, db: Session = Depends(get_db), user: User = procurement_user):
    record = update_record(db, get_record(db, PurchaseOrder, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="procurement", entity_name="PurchaseOrder", entity_id=record.id)
    return record


@router.post("/purchase-orders/{id}/receive", response_model=PurchaseOrderRead)
def receive_purchase_order(id: int, db: Session = Depends(get_db), user: User = procurement_user):
    record = update_record(db, get_record(db, PurchaseOrder, id), {"status": "received"})
    create_audit_log(db, user=user, action="receive", module="procurement", entity_name="PurchaseOrder", entity_id=record.id)
    return record
