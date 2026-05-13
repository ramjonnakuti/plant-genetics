#!/bin/bash
# Double-click this file in Finder to start the app (macOS).
# Spaces in the folder name are OK because we cd using this file's location.

set -e
HERE="$(cd "$(dirname "$0")" && pwd)"
cd "$HERE"

echo ""
echo "Plant Questions — starting from:"
echo "  $HERE"
echo ""

if ! command -v npm >/dev/null 2>&1; then
  echo "Could not find 'npm'. Install Node.js from https://nodejs.org"
  echo "Then double-click this file again."
  echo ""
  read -r -p "Press Enter to close..."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "First time setup: installing packages..."
  npm install
  echo ""
fi

echo "Opening your browser at http://127.0.0.1:5173/"
echo "Press Control+C in this window to stop the server."
echo ""

exec npm run dev
