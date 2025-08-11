from pydantic import BaseModel

class TodoIn(BaseModel):
    title: str
    done: bool = False

class TodoOut(TodoIn):
    id: int
