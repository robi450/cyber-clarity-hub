export default function TodoList({ items, onDelete, onToggle }) {
  if (!items.length) return <p className="text-gray-600">No todos yet.</p>;
  return (
    <ul className="divide-y">
      {items.map((t) => (
        <li key={t.id} className="py-2 flex justify-between items-center gap-4">
          <label className="flex items-center gap-2 flex-1">
            <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} />
            <span className={"font-medium " + (t.done ? "text-green-600" : "")}>
              {t.title}
            </span>
          </label>
          <button onClick={() => onDelete(t.id)} className="text-red-600 hover:underline">
            delete
          </button>
        </li>
      ))}
    </ul>
  );
}
