from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import select
from app.db import get_session
from sqlmodel import Session
from app.models import Todo, TodoCreate

router = APIRouter(prefix="/api/todos", tags=["todos"])

@router.get("/", response_model=List[Todo])
def list_todos(session: Session = Depends(get_session)):
    return session.exec(select(Todo).order_by(Todo.id.desc())).all()

@router.post("/", response_model=Todo, status_code=201)
def create_todo(data: TodoCreate, session: Session = Depends(get_session)):
    todo = Todo.from_orm(data)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo

@router.delete("/{todo_id}", status_code=204)
def delete_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(404, "Not found")
    session.delete(todo)
    session.commit()
    return None

@router.patch("/{todo_id}", response_model=Todo)
def toggle_todo(todo_id: int, session: Session = Depends(get_session)):
    todo = session.get(Todo, todo_id)
    if not todo:
        raise HTTPException(404, "Not found")
    todo.done = not todo.done
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo
