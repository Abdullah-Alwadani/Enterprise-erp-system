from sqlalchemy import Column, DateTime, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import IdMixin, StatusMixin, TimestampMixin


class PurchaseRequest(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "purchase_requests"

    request_number = Column(String(80), unique=True, index=True, nullable=False)
    requested_by = Column(String(150), nullable=False)
    needed_by = Column(DateTime, nullable=True)
    notes = Column(Text, nullable=True)

    items = relationship(
        "PurchaseRequestItem",
        back_populates="purchase_request",
        cascade="all, delete-orphan",
    )


class PurchaseRequestItem(IdMixin, TimestampMixin, Base):
    __tablename__ = "purchase_request_items"

    purchase_request_id = Column(
        Integer,
        ForeignKey("purchase_requests.id"),
        nullable=False,
    )
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    estimated_unit_cost = Column(Numeric(12, 2), default=0, nullable=False)

    purchase_request = relationship("PurchaseRequest", back_populates="items")
    product = relationship("Product", back_populates="purchase_request_items")


class PurchaseOrder(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "purchase_orders"

    order_number = Column(String(80), unique=True, index=True, nullable=False)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"), nullable=False)
    purchase_request_id = Column(Integer, ForeignKey("purchase_requests.id"), nullable=True)
    order_date = Column(DateTime, nullable=True)
    total_amount = Column(Numeric(12, 2), default=0, nullable=False)

    supplier = relationship("Supplier", back_populates="purchase_orders")
    purchase_request = relationship("PurchaseRequest")
    items = relationship(
        "PurchaseOrderItem",
        back_populates="purchase_order",
        cascade="all, delete-orphan",
    )


class PurchaseOrderItem(IdMixin, TimestampMixin, Base):
    __tablename__ = "purchase_order_items"

    purchase_order_id = Column(Integer, ForeignKey("purchase_orders.id"), nullable=False)
    product_id = Column(Integer, ForeignKey("products.id"), nullable=False)
    quantity = Column(Integer, nullable=False)
    unit_cost = Column(Numeric(12, 2), default=0, nullable=False)

    purchase_order = relationship("PurchaseOrder", back_populates="items")
    product = relationship("Product", back_populates="purchase_order_items")
