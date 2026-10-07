#!/usr/bin/env bash

if [[ "${BASH_SOURCE[0]}" == "$0" ]]; then
  printf '%s\n' "Carga este script en la terminal actual: source .sh/create-api-token.sh" >&2
  exit 1
fi

if ! command -v openssl >/dev/null 2>&1; then
  printf '%s\n' "Error: se requiere OpenSSL para generar un token seguro." >&2
  return 1
fi

api_token="$(openssl rand -hex 32)" || {
  printf '%s\n' "Error: OpenSSL no pudo generar el token." >&2
  return 1
}

if [[ ! "$api_token" =~ ^[a-f0-9]{64}$ ]]; then
  printf '%s\n' "Error: OpenSSL devolvio un token con formato inesperado." >&2
  return 1
fi

export API_TOKEN="$api_token"
unset api_token
printf '%s\n' "API_TOKEN generado y exportado en esta terminal (256 bits). Mantenlo privado."
