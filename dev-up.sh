#!/usr/bin/env bash
set -euo pipefail

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
BACK_PORT="${BACK_PORT:-8000}"
FRONT_PORT="${FRONT_PORT:-5173}"

echo "🔎 Ensuring ports are free (:$BACK_PORT, :$FRONT_PORT)…"
fuser -k "$BACK_PORT"/tcp 2>/dev/null || true
fuser -k "$FRONT_PORT"/tcp 2>/dev/null || true

echo "🐍 Activating venv…"
source "$APP_DIR/venv/bin/activate"

echo "🚀 Starting FastAPI on :$BACK_PORT…"
( cd "$APP_DIR" && uvicorn main:app --reload --host 127.0.0.1 --port "$BACK_PORT" ) &
BACK_PID=$!

echo "🌐 Starting Vite on :$FRONT_PORT…"
( cd "$APP_DIR/frontend" && npm run dev ) &
FRONT_PID=$!

echo "✅ Up!  Backend PID=$BACK_PID  Frontend PID=$FRONT_PID"
echo "   Backend:  http://localhost:$BACK_PORT"
echo "   Frontend: http://localhost:$FRONT_PORT"
echo "   Press Ctrl+C to stop both."

cleanup() {
  echo -e "\n🛑 Stopping…"
  kill "$FRONT_PID" "$BACK_PID" 2>/dev/null || true
  wait "$FRONT_PID" "$BACK_PID" 2>/dev/null || true
  echo "👋 Done."
}
trap cleanup INT TERM
wait
