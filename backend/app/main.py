from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import audit_logs, auth, dashboard, finance, hr, inventory, notifications, procurement, reports, sales

app = FastAPI(title="Enterprise ERP System API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(dashboard.router)
app.include_router(hr.router)
app.include_router(inventory.router)
app.include_router(procurement.router)
app.include_router(sales.router)
app.include_router(finance.router)
app.include_router(reports.router)
app.include_router(notifications.router)
app.include_router(audit_logs.router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {
        "status": "ok",
        "message": "Enterprise ERP API is running",
    }
