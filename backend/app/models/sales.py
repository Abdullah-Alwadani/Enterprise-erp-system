from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import IdMixin, StatusMixin, TimestampMixin


class SalesOrder(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "sales_orders"

    order_number = Column(String(80), unique=True, index=True, nullable=False)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    order_date = Column(DateTime, nullable=True)
    total_amount = Column(Numeric(12, 2), default=0, nullable=False)
    notes = Column(Text, nullable=True)

    customer = relationship("Customer", back_populates="sales_orders")
    items = relationship(
        "SalesOrderItem",
        back_populates="sales_order",
        cascade="all, delete-orphan",
    )
    invoice = relationship("Invoice", back_populates="sales_order", uselist=False)


class SalesOrderItem(IdMixin, TimestampMixin, Base):
    __tablename__ = "sales_order_items"

    sales_order_id = Column(Integer, ForeignKey("sales_orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_price = Column(Numeric(12, 2), default=0, nullable=False)

    sales_order = relationship("SalesOrder", back_populates="items")
    product = relationship("Product", back_populates="sales_order_items")
