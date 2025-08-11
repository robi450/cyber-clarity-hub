const BASE = "/api";

async function req(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText} – ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

export const api = {
  health: () => req("/health"),
  listTodos: () => req("/todos"),
  createTodo: (data) => req("/todos", { method: "POST", body: JSON.stringify(data) }),
  deleteTodo: (id) => req(`/todos/${id}`, { method: "DELETE" }),
  toggleTodo: (id) => req(`/todos/${id}`, { method: "PATCH" }),
};
