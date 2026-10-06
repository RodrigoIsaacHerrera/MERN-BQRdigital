#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME="mern-bqrdigital:local"
CONTAINER_NAME="bqrdigital"

if ! command -v docker >/dev/null 2>&1; then
  printf '%s\n' "Error: Docker no está instalado o no está disponible en PATH." >&2
  exit 1
fi

docker info >/dev/null

if [[ "${1:-}" != "" && "${1:-}" != "--yes" ]]; then
  printf 'Uso: bash .sh/clear.sh [--yes]\n' >&2
  exit 2
fi

if [[ "${1:-}" != "--yes" ]]; then
  printf 'Se eliminarán solo el contenedor %s y la imagen %s. ¿Continuar? [y/N] ' "$CONTAINER_NAME" "$IMAGE_NAME"
  read -r answer
  case "$answer" in
    y|Y|yes|YES) ;;
    *) printf '%s\n' "Cancelado."; exit 1 ;;
  esac
fi

if docker container inspect "$CONTAINER_NAME" >/dev/null 2>&1; then
  docker rm --force "$CONTAINER_NAME"
else
  printf 'El contenedor %s no existe.\n' "$CONTAINER_NAME"
fi

if docker image inspect "$IMAGE_NAME" >/dev/null 2>&1; then
  docker image rm "$IMAGE_NAME"
else
  printf 'La imagen %s no existe.\n' "$IMAGE_NAME"
fi
