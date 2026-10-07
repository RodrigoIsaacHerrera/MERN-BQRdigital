#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
TOKEN_SCRIPT="$SCRIPT_DIR/../.sh/create-api-token.sh"

unset API_TOKEN
source "$TOKEN_SCRIPT"
[[ "$API_TOKEN" =~ ^[a-f0-9]{64}$ ]]
first_token="$API_TOKEN"

source "$TOKEN_SCRIPT"
[[ "$API_TOKEN" =~ ^[a-f0-9]{64}$ ]]
[[ "$API_TOKEN" != "$first_token" ]]

printf '%s\n' "Token generation test passed."
