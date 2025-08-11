import { useState } from "react";

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("");
  async function submit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    await onAdd({ title, done: false });
    setTitle("");
  }
  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="New task…"
        className="border rounded p-2 flex-1"
      />
      <button className="bg-black text-white px-3 rounded">Add</button>
    </form>
  );
}
