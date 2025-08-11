import { useState, useEffect, useRef } from "react";

const DEFAULT_TRACK = [
  { id: "a-plus",   name: "CompTIA A+",         provider: "CompTIA", hours: 40,  hoursStudied: 0, done: false },
  { id: "net-plus", name: "CompTIA Network+",   provider: "CompTIA", hours: 50,  hoursStudied: 0, done: false },
  { id: "sec-plus", name: "CompTIA Security+",  provider: "CompTIA", hours: 60,  hoursStudied: 0, done: false },
  { id: "cysa-plus",name: "CompTIA CySA+",      provider: "CompTIA", hours: 70,  hoursStudied: 0, done: false },
  { id: "casp-plus",name: "CompTIA CASP+",      provider: "CompTIA", hours: 80,  hoursStudied: 0, done: false },
  { id: "cissp",    name: "CISSP",              provider: "ISC²",    hours: 120, hoursStudied: 0, done: false },
];

const LINKS = {
  "CompTIA A+": "https://www.comptia.org/certifications/a",
  "CompTIA Network+": "https://www.comptia.org/certifications/network",
  "CompTIA Security+": "https://www.comptia.org/certifications/security",
  "CompTIA CySA+": "https://www.comptia.org/certifications/cybersecurity-analyst",
  "CompTIA CASP+": "https://www.comptia.org/certifications/casp",
  CISSP: "https://www.isc2.org/certifications/cissp",
};

const KEY = "learning_track_v1";

export default function Learning() {
  const [track, setTrack] = useState(DEFAULT_TRACK);
  const [currentId, setCurrentId] = useState(DEFAULT_TRACK[0].id);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0); // seconds this session
  const timerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setTrack(parsed);
      if (parsed[0]) setCurrentId(parsed[0].id);
    }
  }, []);
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(track)), [track]);

  const completed = track.filter((t) => t.done).length;
  const overallPct = Math.round((completed / track.length) * 100);

  function toggleDone(id) {
    setTrack((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function addHours(id, delta) {
    setTrack((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, hoursStudied: Math.max(0, Math.min(t.hours, t.hoursStudied + delta)) }
          : t
      )
    );
  }

  function start() {
    if (running) return;
    setRunning(true);
    timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
  }
  function stop() {
    if (!running) return;
    clearInterval(timerRef.current);
    timerRef.current = null;
    setRunning(false);
    const hoursAdd = elapsed / 3600;
    setElapsed(0);
    addHours(currentId, hoursAdd);
  }
  function resetTimer() { setElapsed(0); }

  function fmt(s) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  }

  return (
    <div className="p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">Cybersecurity Learning</h1>
      <p className="text-gray-700 mb-4">
        Track your cert progress, log study time, and visualize progress. Stored locally.
      </p>

      {/* Overall progress */}
      <div className="border rounded p-3 mb-6">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Overall completion</span>
          <span>{overallPct}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded mt-2">
          <div className="h-2 bg-black rounded" style={{ width: `${overallPct}%` }} />
        </div>
      </div>

      {/* Session timer */}
      <div className="border rounded p-3 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <select value={currentId} onChange={(e) => setCurrentId(e.target.value)} className="border rounded p-2">
            {track.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <button onClick={start} className="bg-black text-white px-3 rounded">{running ? "Running…" : "Start"}</button>
          <button onClick={stop} className="px-3 rounded border">Stop & Save</button>
          <button onClick={resetTimer} className="px-3 rounded border">Reset</button>
          <span className="ml-auto font-mono">{fmt(elapsed)}</span>
        </div>
        <p className="text-sm text-gray-600">“Stop & Save” adds the elapsed time to the selected cert.</p>
      </div>

      {/* Per-cert progress */}
      <ul className="divide-y">
        {track.map((t) => {
          const pct = Math.round((t.hoursStudied / t.hours) * 100);
          return (
            <li key={t.id} className="py-4">
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.provider} • target {t.hours}h • studied {t.hoursStudied.toFixed(1)}h</p>
                  <div className="h-2 bg-gray-200 rounded mt-2">
                    <div className="h-2 bg-green-600 rounded" style={{ width: `${Math.min(100, pct)}%` }} />
                  </div>
                  <div className="mt-2 flex gap-2">
                    <a href={(LINKS[t.name] ?? "#")} target="_blank" rel="noreferrer" className="text-blue-700 underline text-sm">Official info</a>
                    <button className="border rounded px-2 text-sm" onClick={() => addHours(t.id, 0.5)}>+0.5h</button>
                    <button className="border rounded px-2 text-sm" onClick={() => addHours(t.id, -0.5)}>-0.5h</button>
                  </div>
                </div>
                <label className="flex items-center gap-2 ml-4">
                  <input type="checkbox" checked={t.done} onChange={() => toggleDone(t.id)} />
                  <span className="text-sm">{t.done ? "Done" : "In progress"}</span>
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
