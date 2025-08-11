#!/usr/bin/env bash
set -euo pipefail
BACK_PORT="${BACK_PORT:-8000}"
FRONT_PORT="${FRONT_PORT:-5173}"
echo "🧹 Killing anything on :$BACK_PORT and :$FRONT_PORT…"
fuser -k "$BACK_PORT"/tcp 2>/dev/null || true
fuser -k "$FRONT_PORT"/tcp 2>/dev/null || true
echo "✅ Done."
