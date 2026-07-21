from sqlalchemy.orm import Session

from app.models import Role, User
from app.services.security import get_password_hash, verify_password


def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def authenticate_user(db: Session, email: str, password: str) -> User | None:
    user = get_user_by_email(db, email)
    if not user or not verify_password(password, user.hashed_password):
        return None
    return user


def create_user(
    db: Session,
    *,
    email: str,
    full_name: str,
    password: str,
    role_id: int,
    is_superuser: bool = False,
) -> User:
    user = User(
        email=email,
        full_name=full_name,
        hashed_password=get_password_hash(password),
        role_id=role_id,
        is_superuser=is_superuser,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def role_exists(db: Session, role_id: int) -> bool:
    return db.query(Role.id).filter(Role.id == role_id).first() is not None
