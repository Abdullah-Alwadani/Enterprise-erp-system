from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, EmailStr


class ORMModel(BaseModel):
    model_config = {"from_attributes": True}


class DepartmentBase(BaseModel):
    name: str
    description: str | None = None
    status: str = "active"
    is_active: bool = True


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    status: str | None = None
    is_active: bool | None = None


class DepartmentRead(DepartmentBase, ORMModel):
    id: int


class EmployeeBase(BaseModel):
    employee_code: str
    first_name: str
    last_name: str
    email: EmailStr
    phone: str | None = None
    job_title: str
    hire_date: date | None = None
    department_id: int
    status: str = "active"
    is_active: bool = True


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(BaseModel):
    employee_code: str | None = None
    first_name: str | None = None
    last_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    job_title: str | None = None
    hire_date: date | None = None
    department_id: int | None = None
    status: str | None = None
    is_active: bool | None = None


class EmployeeRead(EmployeeBase, ORMModel):
    id: int


class ProductCategoryBase(BaseModel):
    name: str
    description: str | None = None
    status: str = "active"
    is_active: bool = True


class ProductCategoryCreate(ProductCategoryBase):
    pass


class ProductCategoryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    status: str | None = None
    is_active: bool | None = None


class ProductCategoryRead(ProductCategoryBase, ORMModel):
    id: int


class ProductBase(BaseModel):
    sku: str
    name: str
    description: str | None = None
    unit_price: Decimal = Decimal("0.00")
    quantity_on_hand: int = 0
    reorder_level: int = 0
    category_id: int
    supplier_id: int | None = None
    status: str = "active"
    is_active: bool = True


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    sku: str | None = None
    name: str | None = None
    description: str | None = None
    unit_price: Decimal | None = None
    quantity_on_hand: int | None = None
    reorder_level: int | None = None
    category_id: int | None = None
    supplier_id: int | None = None
    status: str | None = None
    is_active: bool | None = None


class ProductRead(ProductBase, ORMModel):
    id: int


class PartnerBase(BaseModel):
    name: str
    contact_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    address: str | None = None
    status: str = "active"
    is_active: bool = True


class PartnerCreate(PartnerBase):
    pass


class PartnerUpdate(BaseModel):
    name: str | None = None
    contact_name: str | None = None
    email: EmailStr | None = None
    phone: str | None = None
    address: str | None = None
    status: str | None = None
    is_active: bool | None = None


class SupplierRead(PartnerBase, ORMModel):
    id: int


class CustomerRead(PartnerBase, ORMModel):
    id: int


class PurchaseRequestBase(BaseModel):
    request_number: str
    requested_by: str
    needed_by: datetime | None = None
    notes: str | None = None
    status: str = "draft"
    is_active: bool = True


class PurchaseRequestCreate(PurchaseRequestBase):
    pass


class PurchaseRequestUpdate(BaseModel):
    request_number: str | None = None
    requested_by: str | None = None
    needed_by: datetime | None = None
    notes: str | None = None
    status: str | None = None
    is_active: bool | None = None


class PurchaseRequestRead(PurchaseRequestBase, ORMModel):
    id: int


class PurchaseOrderBase(BaseModel):
    order_number: str
    supplier_id: int
    purchase_request_id: int | None = None
    order_date: datetime | None = None
    total_amount: Decimal = Decimal("0.00")
    status: str = "draft"
    is_active: bool = True


class PurchaseOrderCreate(PurchaseOrderBase):
    pass


class PurchaseOrderUpdate(BaseModel):
    order_number: str | None = None
    supplier_id: int | None = None
    purchase_request_id: int | None = None
    order_date: datetime | None = None
    total_amount: Decimal | None = None
    status: str | None = None
    is_active: bool | None = None


class PurchaseOrderRead(PurchaseOrderBase, ORMModel):
    id: int


class SalesOrderBase(BaseModel):
    order_number: str
    customer_id: int
    order_date: datetime | None = None
    total_amount: Decimal = Decimal("0.00")
    notes: str | None = None
    status: str = "draft"
    is_active: bool = True


class SalesOrderCreate(SalesOrderBase):
    pass


class SalesOrderUpdate(BaseModel):
    order_number: str | None = None
    customer_id: int | None = None
    order_date: datetime | None = None
    total_amount: Decimal | None = None
    notes: str | None = None
    status: str | None = None
    is_active: bool | None = None


class SalesOrderRead(SalesOrderBase, ORMModel):
    id: int


class InvoiceBase(BaseModel):
    invoice_number: str
    sales_order_id: int
    invoice_date: datetime | None = None
    due_date: datetime | None = None
    total_amount: Decimal = Decimal("0.00")
    status: str = "draft"
    is_active: bool = True


class InvoiceCreate(InvoiceBase):
    pass


class InvoiceUpdate(BaseModel):
    invoice_number: str | None = None
    sales_order_id: int | None = None
    invoice_date: datetime | None = None
    due_date: datetime | None = None
    total_amount: Decimal | None = None
    status: str | None = None
    is_active: bool | None = None


class InvoiceRead(InvoiceBase, ORMModel):
    id: int


class PaymentBase(BaseModel):
    payment_number: str
    invoice_id: int
    payment_date: datetime | None = None
    amount: Decimal = Decimal("0.00")
    method: str | None = None
    status: str = "completed"
    is_active: bool = True


class PaymentCreate(PaymentBase):
    pass


class PaymentRead(PaymentBase, ORMModel):
    id: int


class NotificationRead(ORMModel):
    id: int
    user_id: int
    title: str
    message: str
    notification_type: str
    status: str
    is_active: bool


class AuditLogRead(ORMModel):
    id: int
    user_id: int | None = None
    action: str
    module: str
    entity_name: str | None = None
    entity_id: int | None = None
    details: str | None = None
    created_at: datetime
