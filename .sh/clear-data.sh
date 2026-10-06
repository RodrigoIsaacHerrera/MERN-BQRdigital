#!/usr/bin/env bash
set -euo pipefail

VOLUME_NAME="${1:-}"

if [[ "$#" -lt 1 || "$#" -gt 2 || ( "$#" -eq 2 && "$2" != "--yes" ) ]]; then
  printf 'Uso: bash .sh/clear-data.sh <nombre-del-volumen> [--yes]\n' >&2
  exit 2
fi

if ! command -v docker >/dev/null 2>&1; then
  printf '%s\n' "Error: Docker no está instalado o no está disponible en PATH." >&2
  exit 1
fi

docker info >/dev/null

if ! docker volume inspect "$VOLUME_NAME" >/dev/null 2>&1; then
  printf 'Error: no existe el volumen Docker: %s\n' "$VOLUME_NAME" >&2
  exit 1
fi

attached_containers="$(docker ps --all --filter "volume=$VOLUME_NAME" --format '{{.Names}}')"
if [[ -n "$attached_containers" ]]; then
  printf 'Error: el volumen %s está asociado a estos contenedores:\n%s\n' "$VOLUME_NAME" "$attached_containers" >&2
  printf '%s\n' "Detén y elimina intencionalmente el contenedor MongoDB antes de borrar el volumen." >&2
  exit 1
fi

if [[ "${2:-}" != "--yes" ]]; then
  printf 'Se borrarán permanentemente todos los datos del volumen Docker %s. ¿Continuar? [y/N] ' "$VOLUME_NAME"
  read -r answer
  case "$answer" in
    y|Y|yes|YES) ;;
    *) printf '%s\n' "Cancelado."; exit 1 ;;
  esac
fi

docker volume rm "$VOLUME_NAME"
