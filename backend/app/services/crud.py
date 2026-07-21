from datetime import datetime
from typing import Any

from fastapi import HTTPException, status
from sqlalchemy.orm import Session


def list_records(
    db: Session,
    model,
    *,
    status_value: str | None = None,
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    extra_filters: dict[str, Any] | None = None,
) -> list:
    query = db.query(model)
    if status_value is not None and hasattr(model, "status"):
        query = query.filter(model.status == status_value)
    if start_date is not None and hasattr(model, "created_at"):
        query = query.filter(model.created_at >= start_date)
    if end_date is not None and hasattr(model, "created_at"):
        query = query.filter(model.created_at <= end_date)
    for key, value in (extra_filters or {}).items():
        if value is not None and hasattr(model, key):
            query = query.filter(getattr(model, key) == value)
    return query.order_by(model.id.desc()).all()


def get_record(db: Session, model, record_id: int):
    record = db.query(model).filter(model.id == record_id).first()
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{model.__name__} not found",
        )
    return record


def create_record(db: Session, model, data: dict[str, Any]):
    record = model(**data)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def update_record(db: Session, record, data: dict[str, Any]):
    for key, value in data.items():
        setattr(record, key, value)
    db.commit()
    db.refresh(record)
    return record


def soft_delete_record(db: Session, record):
    if hasattr(record, "is_active"):
        record.is_active = False
    if hasattr(record, "status"):
        record.status = "inactive"
    db.commit()
    db.refresh(record)
    return record
