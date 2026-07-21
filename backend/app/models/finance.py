from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import IdMixin, StatusMixin, TimestampMixin


class Invoice(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "invoices"

    invoice_number = Column(String(80), unique=True, index=True, nullable=False)
    sales_order_id = Column(Integer, ForeignKey("sales_orders.id"), nullable=False)
    invoice_date = Column(DateTime, nullable=True)
    due_date = Column(DateTime, nullable=True)
    total_amount = Column(Numeric(12, 2), default=0, nullable=False)

    sales_order = relationship("SalesOrder", back_populates="invoice")
    payments = relationship("Payment", back_populates="invoice")


class Payment(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "payments"

    payment_number = Column(String(80), unique=True, index=True, nullable=False)
    invoice_id = Column(Integer, ForeignKey("invoices.id"), nullable=False)
    payment_date = Column(DateTime, nullable=True)
    amount = Column(Numeric(12, 2), default=0, nullable=False)
    method = Column(String(80), nullable=True)

    invoice = relationship("Invoice", back_populates="payments")
