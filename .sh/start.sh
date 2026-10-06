#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
IMAGE_NAME="mern-bqrdigital:local"
CONTAINER_NAME="bqrdigital"
HOST_PORT="${HOST_PORT:-1989}"

: "${API_TOKEN:?Configura API_TOKEN antes de iniciar el contenedor.}"
: "${MONGODB_URI:?Configura MONGODB_URI con una URI accesible desde Docker.}"

if ! command -v docker >/dev/null 2>&1; then
  printf '%s\n' "Error: Docker no está instalado o no está disponible en PATH." >&2
  exit 1
fi

docker info >/dev/null

if docker container inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
  printf 'Error: el contenedor %s ya existe; usa .sh/stop.sh o .sh/clear.sh primero.\n' "$CONTAINER_NAME" >&2
  exit 1
fi

bash "$SCRIPT_DIR/build.sh"

docker run --detach \
  --name "$CONTAINER_NAME" \
  --publish "${HOST_PORT}:1989" \
  --env "API_TOKEN=$API_TOKEN" \
  --env "MONGODB_URI=$MONGODB_URI" \
  "$IMAGE_NAME"
