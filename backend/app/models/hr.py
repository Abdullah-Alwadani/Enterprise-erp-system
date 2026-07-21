from sqlalchemy import Column, Date, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import IdMixin, StatusMixin, TimestampMixin


class Department(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "departments"

    name = Column(String(150), unique=True, index=True, nullable=False)
    description = Column(String(255), nullable=True)

    employees = relationship("Employee", back_populates="department")


class Employee(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "employees"

    employee_code = Column(String(50), unique=True, index=True, nullable=False)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(50), nullable=True)
    job_title = Column(String(150), nullable=False)
    hire_date = Column(Date, nullable=True)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)

    department = relationship("Department", back_populates="employees")
