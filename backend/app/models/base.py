from datetime import UTC, datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String


def utc_now() -> datetime:
    return datetime.now(UTC).replace(tzinfo=None)


class TimestampMixin:
    created_at = Column(DateTime, default=utc_now, nullable=False)
    updated_at = Column(
        DateTime,
        default=utc_now,
        onupdate=utc_now,
        nullable=False,
    )


class StatusMixin:
    status = Column(String(50), default="active", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)


class IdMixin:
    id = Column(Integer, primary_key=True, index=True)
