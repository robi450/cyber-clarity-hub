import { useEffect, useState } from "react";
import { api } from "../api/client";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

export default function Todos() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  async function refresh() {
    setErr("");
    try {
      setItems(await api.listTodos());
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  async function addTodo(data) {
    setErr("");
    try {
      await api.createTodo(data);
      await refresh();
    } catch (e) {
      setErr(e.message);
    }
  }

  async function remove(id) {
    setErr("");
    try {
      await api.deleteTodo(id);
      setItems((prev) => prev.filter((t) => t.id !== id));
    } catch (e) {
      setErr(e.message);
    }
  }

  async function toggle(id) {
    setErr("");
    try {
      const updated = await api.toggleTodo(id);
      setItems((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (e) {
      setErr(e.message);
    }
  }

  return (
    <div className="p-4 max-w-xl">
      <h1 className="text-2xl font-bold mb-4">Todos</h1>
      <TodoForm onAdd={addTodo} />
      {err && <p className="text-red-600 mt-3">{err}</p>}
      <div className="mt-4">{loading ? "Loading…" : <TodoList items={items} onDelete={remove} onToggle={toggle} />}</div>
    </div>
  );
}
