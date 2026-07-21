from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Local development defaults only. Override these in backend/.env or environment variables.
    database_url: str = "sqlite:///./erp.db"
    secret_key: str = "replace-with-a-secure-random-secret"
    access_token_expire_minutes: int = 60

    model_config = SettingsConfigDict(env_file=(".env", "backend/.env"), extra="ignore")


settings = Settings()
