from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import Product, ProductCategory, User
from app.schemas import (
    ProductCategoryCreate,
    ProductCategoryRead,
    ProductCategoryUpdate,
    ProductCreate,
    ProductRead,
    ProductUpdate,
)
from app.services.audit import create_audit_log
from app.services.crud import create_record, get_record, list_records, soft_delete_record, update_record
from app.utils.roles import INVENTORY_MANAGER

router = APIRouter(tags=["Inventory"])
inventory_user = Depends(require_roles(INVENTORY_MANAGER))


@router.get("/product-categories", response_model=list[ProductCategoryRead])
def list_categories(db: Session = Depends(get_db), _: User = inventory_user):
    return list_records(db, ProductCategory)


@router.post("/product-categories", response_model=ProductCategoryRead)
def create_category(payload: ProductCategoryCreate, db: Session = Depends(get_db), user: User = inventory_user):
    record = create_record(db, ProductCategory, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="inventory", entity_name="ProductCategory", entity_id=record.id)
    return record


@router.put("/product-categories/{id}", response_model=ProductCategoryRead)
def update_category(id: int, payload: ProductCategoryUpdate, db: Session = Depends(get_db), user: User = inventory_user):
    record = update_record(db, get_record(db, ProductCategory, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="inventory", entity_name="ProductCategory", entity_id=record.id)
    return record


@router.delete("/product-categories/{id}", response_model=ProductCategoryRead)
def delete_category(id: int, db: Session = Depends(get_db), user: User = inventory_user):
    record = soft_delete_record(db, get_record(db, ProductCategory, id))
    create_audit_log(db, user=user, action="delete", module="inventory", entity_name="ProductCategory", entity_id=record.id)
    return record


@router.get("/products", response_model=list[ProductRead])
def list_products(
    status: str | None = None,
    category: int | None = Query(default=None),
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    db: Session = Depends(get_db),
    _: User = inventory_user,
):
    return list_records(db, Product, status_value=status, start_date=start_date, end_date=end_date, extra_filters={"category_id": category})


@router.post("/products", response_model=ProductRead)
def create_product(payload: ProductCreate, db: Session = Depends(get_db), user: User = inventory_user):
    record = create_record(db, Product, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="inventory", entity_name="Product", entity_id=record.id)
    return record


@router.get("/products/low-stock", response_model=list[ProductRead])
def low_stock_products(db: Session = Depends(get_db), _: User = inventory_user):
    return db.query(Product).filter(Product.quantity_on_hand <= Product.reorder_level).all()


@router.get("/products/{id}", response_model=ProductRead)
def get_product(id: int, db: Session = Depends(get_db), _: User = inventory_user):
    return get_record(db, Product, id)


@router.put("/products/{id}", response_model=ProductRead)
def update_product(id: int, payload: ProductUpdate, db: Session = Depends(get_db), user: User = inventory_user):
    record = update_record(db, get_record(db, Product, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="inventory", entity_name="Product", entity_id=record.id)
    return record


@router.delete("/products/{id}", response_model=ProductRead)
def delete_product(id: int, db: Session = Depends(get_db), user: User = inventory_user):
    record = soft_delete_record(db, get_record(db, Product, id))
    create_audit_log(db, user=user, action="delete", module="inventory", entity_name="Product", entity_id=record.id)
    return record
