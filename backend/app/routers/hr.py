from datetime import datetime

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import require_roles
from app.models import Department, Employee, User
from app.schemas import (
    DepartmentCreate,
    DepartmentRead,
    DepartmentUpdate,
    EmployeeCreate,
    EmployeeRead,
    EmployeeUpdate,
)
from app.services.audit import create_audit_log
from app.services.crud import create_record, get_record, list_records, soft_delete_record, update_record
from app.utils.roles import HR_MANAGER

router = APIRouter(tags=["HR"])
hr_user = Depends(require_roles(HR_MANAGER))


@router.get("/departments", response_model=list[DepartmentRead])
def list_departments(
    status: str | None = None,
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    db: Session = Depends(get_db),
    _: User = hr_user,
):
    return list_records(db, Department, status_value=status, start_date=start_date, end_date=end_date)


@router.post("/departments", response_model=DepartmentRead)
def create_department(payload: DepartmentCreate, db: Session = Depends(get_db), user: User = hr_user):
    record = create_record(db, Department, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="hr", entity_name="Department", entity_id=record.id)
    return record


@router.get("/departments/{id}", response_model=DepartmentRead)
def get_department(id: int, db: Session = Depends(get_db), _: User = hr_user):
    return get_record(db, Department, id)


@router.put("/departments/{id}", response_model=DepartmentRead)
def update_department(id: int, payload: DepartmentUpdate, db: Session = Depends(get_db), user: User = hr_user):
    record = update_record(db, get_record(db, Department, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="hr", entity_name="Department", entity_id=record.id)
    return record


@router.delete("/departments/{id}", response_model=DepartmentRead)
def delete_department(id: int, db: Session = Depends(get_db), user: User = hr_user):
    record = soft_delete_record(db, get_record(db, Department, id))
    create_audit_log(db, user=user, action="delete", module="hr", entity_name="Department", entity_id=record.id)
    return record


@router.get("/employees", response_model=list[EmployeeRead])
def list_employees(
    status: str | None = None,
    department: int | None = Query(default=None),
    start_date: datetime | None = None,
    end_date: datetime | None = None,
    db: Session = Depends(get_db),
    _: User = hr_user,
):
    return list_records(
        db,
        Employee,
        status_value=status,
        start_date=start_date,
        end_date=end_date,
        extra_filters={"department_id": department},
    )


@router.post("/employees", response_model=EmployeeRead)
def create_employee(payload: EmployeeCreate, db: Session = Depends(get_db), user: User = hr_user):
    record = create_record(db, Employee, payload.model_dump())
    create_audit_log(db, user=user, action="create", module="hr", entity_name="Employee", entity_id=record.id)
    return record


@router.get("/employees/{id}", response_model=EmployeeRead)
def get_employee(id: int, db: Session = Depends(get_db), _: User = hr_user):
    return get_record(db, Employee, id)


@router.put("/employees/{id}", response_model=EmployeeRead)
def update_employee(id: int, payload: EmployeeUpdate, db: Session = Depends(get_db), user: User = hr_user):
    record = update_record(db, get_record(db, Employee, id), payload.model_dump(exclude_unset=True))
    create_audit_log(db, user=user, action="update", module="hr", entity_name="Employee", entity_id=record.id)
    return record


@router.delete("/employees/{id}", response_model=EmployeeRead)
def delete_employee(id: int, db: Session = Depends(get_db), user: User = hr_user):
    record = soft_delete_record(db, get_record(db, Employee, id))
    create_audit_log(db, user=user, action="delete", module="hr", entity_name="Employee", entity_id=record.id)
    return record
