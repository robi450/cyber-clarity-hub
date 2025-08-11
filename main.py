from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db import create_db_and_tables
from app.api.routes.todos import router as todos_router

app = FastAPI(title="MicroSaaS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_credentials=True,
    allow_methods=["*"], allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

@app.get("/api/health")
def health():
    return {"ok": True}

app.include_router(todos_router)
