from sqlalchemy.orm import Session

from app.models import AuditLog, User


def create_audit_log(
    db: Session,
    *,
    user: User | None,
    action: str,
    module: str,
    entity_name: str | None = None,
    entity_id: int | None = None,
    details: str | None = None,
) -> AuditLog:
    audit_log = AuditLog(
        user_id=user.id if user else None,
        action=action,
        module=module,
        entity_name=entity_name,
        entity_id=entity_id,
        details=details,
    )
    db.add(audit_log)
    db.commit()
    db.refresh(audit_log)
    return audit_log
