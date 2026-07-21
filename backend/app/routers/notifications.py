from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models import Notification, User
from app.schemas import NotificationRead
from app.services.audit import create_audit_log
from app.services.crud import get_record, update_record

router = APIRouter(prefix="/notifications", tags=["Notifications"])


@router.get("", response_model=list[NotificationRead])
def list_notifications(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Notification).filter(Notification.user_id == user.id).order_by(Notification.id.desc()).all()


@router.post("/{id}/read", response_model=NotificationRead)
def mark_notification_read(id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    record = get_record(db, Notification, id)
    record = update_record(db, record, {"status": "read"})
    create_audit_log(db, user=user, action="read", module="notifications", entity_name="Notification", entity_id=record.id)
    return record
