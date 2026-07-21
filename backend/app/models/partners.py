from sqlalchemy import Column, String, Text
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import IdMixin, StatusMixin, TimestampMixin


class Supplier(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "suppliers"

    name = Column(String(200), unique=True, index=True, nullable=False)
    contact_name = Column(String(150), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    address = Column(Text, nullable=True)

    products = relationship("Product", back_populates="supplier")
    purchase_orders = relationship("PurchaseOrder", back_populates="supplier")


class Customer(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "customers"

    name = Column(String(200), unique=True, index=True, nullable=False)
    contact_name = Column(String(150), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(50), nullable=True)
    address = Column(Text, nullable=True)

    sales_orders = relationship("SalesOrder", back_populates="customer")
