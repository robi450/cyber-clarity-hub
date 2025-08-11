export async function getHealth() {
  const r = await fetch('/api/health');
  if (!r.ok) throw new Error('API error');
  return r.json();
}
