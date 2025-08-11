from pydantic import BaseModel
from functools import lru_cache

class Settings(BaseModel):
    PROJECT_NAME: str = "MicroSaaS"
    API_PREFIX: str = "/api"

@lru_cache
def get_settings() -> Settings:
    return Settings()
