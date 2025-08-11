from typing import Optional
from sqlmodel import SQLModel, Field

class TodoBase(SQLModel):
    title: str
    done: bool = False

class Todo(TodoBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class TodoCreate(TodoBase):
    pass
