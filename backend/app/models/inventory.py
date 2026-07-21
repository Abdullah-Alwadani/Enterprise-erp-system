from sqlalchemy import Column, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import relationship

from app.database import Base
from app.models.base import IdMixin, StatusMixin, TimestampMixin


class ProductCategory(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "product_categories"

    name = Column(String(150), unique=True, index=True, nullable=False)
    description = Column(Text, nullable=True)

    products = relationship("Product", back_populates="category")


class Product(IdMixin, TimestampMixin, StatusMixin, Base):
    __tablename__ = "products"

    sku = Column(String(80), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    unit_price = Column(Numeric(12, 2), default=0, nullable=False)
    quantity_on_hand = Column(Integer, default=0, nullable=False)
    reorder_level = Column(Integer, default=0, nullable=False)
    category_id = Column(Integer, ForeignKey("product_categories.id"), nullable=False)
    supplier_id = Column(Integer, ForeignKey("suppliers.id"), nullable=True)

    category = relationship("ProductCategory", back_populates="products")
    supplier = relationship("Supplier", back_populates="products")
    purchase_request_items = relationship("PurchaseRequestItem", back_populates="product")
    purchase_order_items = relationship("PurchaseOrderItem", back_populates="product")
    sales_order_items = relationship("SalesOrderItem", back_populates="product")
