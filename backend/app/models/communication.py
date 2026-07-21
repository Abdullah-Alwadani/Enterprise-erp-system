from sqlalchemy import Column, ForeignKey, Integer, String, Text
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import IdMixin, StatusMixin, TimestampMixin


class Notification(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "notifications"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    title = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    notification_type = Column(String(80), default="info", nullable=False)

    user = relationship("User", back_populates="notifications")


class AuditLog(IdMixin, TimestampMixin, Base):
    __tablename__ = "audit_logs"

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False)
    module = Column(String(100), nullable=False)
    entity_name = Column(String(100), nullable=True)
    entity_id = Column(Integer, nullable=True)
    details = Column(Text, nullable=True)

    user = relationship("User", back_populates="audit_logs")
