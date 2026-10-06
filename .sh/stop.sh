#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="bqrdigital"

if ! command -v docker >/dev/null 2>&1; then
  printf '%s\n' "Error: Docker no está instalado o no está disponible en PATH." >&2
  exit 1
fi

docker info >/dev/null

if ! docker container inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
  printf 'El contenedor %s no existe; se limpiará la imagen del proyecto si está presente.\n' "$CONTAINER_NAME"
else
  docker stop "$CONTAINER_NAME"
fi

bash "$SCRIPT_DIR/clear.sh" --yes
