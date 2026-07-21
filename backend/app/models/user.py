from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import IdMixin, StatusMixin, TimestampMixin


class Role(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "roles"

    name = Column(String(100), unique=True, index=True, nullable=False)
    description = Column(String(255), nullable=True)

    users = relationship("User", back_populates="role")


class User(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role_id = Column(Integer, ForeignKey("roles.id"), nullable=False)
    is_superuser = Column(Boolean, default=False, nullable=False)

    role = relationship("Role", back_populates="users")
    notifications = relationship("Notification", back_populates="user")
    audit_logs = relationship("AuditLog", back_populates="user")
