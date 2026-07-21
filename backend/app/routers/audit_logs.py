from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import AuditLog, User
from app.schemas import AuditLogRead
from app.services.crud import list_records
from app.utils.roles import ADMIN

router = APIRouter(prefix="/audit-logs", tags=["Audit Logs"])


@router.get("", response_model=list[AuditLogRead])
def list_audit_logs(
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles(ADMIN)),
):
    return list_records(db, AuditLog, start_date=start_date, end_date=end_date)
