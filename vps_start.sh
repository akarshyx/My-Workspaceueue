#!/usr/bin/env bash
set -Eeuo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR"

PYTHON="${PYTHON_BIN:-python3}"
VENV_DIR="$PROJECT_DIR/.venv"

if [[ ! -x "$VENV_DIR/bin/python" ]]; then
  echo "[setup] Creating Python virtual environment at $VENV_DIR"
  "$PYTHON" -m venv "$VENV_DIR"
fi

VENV_PYTHON="$VENV_DIR/bin/python"

echo "[setup] Installing dependencies from requirements.txt"
"$VENV_PYTHON" -m pip install --upgrade pip
"$VENV_PYTHON" -m pip install --no-cache-dir -r requirements.txt

export PYTHON_BIN="$VENV_PYTHON"
exec "$PROJECT_DIR/run.sh"