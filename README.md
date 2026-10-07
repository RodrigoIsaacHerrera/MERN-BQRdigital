# BQRdigital

**Digital passenger tickets with QR codes**

BQRdigital is a small MERN application for creating, viewing, updating, and deleting passenger tickets. The React client is bundled with webpack, the Express API serves ticket operations, and MongoDB stores ticket records.

## Contents

- [Requirements](#requirements)
- [Quick start](#quick-start)
- [Configuration](#configuration)
- [API reference](#api-reference)
- [Security](#security)
- [Development and tests](#development-and-tests)
- [Dependency security plan](#dependency-security-plan)
- [Operational runbook](#operational-runbook)

## Requirements

- Node.js 22 or newer and npm
- MongoDB 5 or newer, running locally or reachable through a MongoDB connection URI
- Docker Engine (optional, for containerized use)
- Bash and OpenSSL for the API token helper (Git Bash and WSL are supported on Windows)

## Quick start

1. Install dependencies:

   ```sh
   npm ci
   ```

2. Start MongoDB and create a token in Bash (Git Bash or WSL on Windows):

   ```sh
   source .sh/create-api-token.sh
   export MONGODB_URI="mongodb://127.0.0.1:27017/BQRdigital"
   ```

   The helper exports a fresh 256-bit token only in the current terminal; source
   it again in each new server terminal. To enter the token in the browser,
   reveal it only in a trusted terminal with `printf '%s\n' "$API_TOKEN"`.
   Keep it private.

3. Build the browser client and start the server:

   ```sh
   npm run build
   npm start
   ```

4. Open <http://localhost:1989>, enter the same API token in the access-token field, and select **Connect**.

The application listens on port `1989` by default. Set `PORT` to use another port. See the [operational runbook](./RUNBOOK.md) for detailed startup, smoke-test, and troubleshooting steps.

## Docker deployment

The production image uses Node.js 22 on Alpine, builds and tests the React client in a multi-stage build, and contains only runtime dependencies in its final stage. It runs as the unprivileged `node` user, removes npm from the runtime image, and exposes `/healthz` for container health checks. MongoDB is external and is not included in the image.

```sh
source .sh/create-api-token.sh
export MONGODB_URI="mongodb://host.docker.internal:27017/BQRdigital"
bash .sh/start.sh
```

Replace the example MongoDB URI with a database reachable from the container.
The start script builds the image before starting the container; set
`HOST_PORT` to change the host port (the container listens on `1989`). For
hosted production, inject secrets through the platform's secret/configuration
mechanism. To check startup, use
`docker inspect --format='{{.State.Health.Status}}' bqrdigital`. Use
`bash .sh/stop.sh` to stop and remove this project's container and image.
MongoDB remains external; if its data is in a Docker volume, remove that volume
explicitly with `bash .sh/clear-data.sh <volume-name>` after removing its
MongoDB container. See the Docker section in [RUNBOOK.md](./RUNBOOK.md) for
more detail.

## Configuration

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `API_TOKEN` | Yes | — | Shared Bearer token required for every `/api/boletos` request. |
| `MONGODB_URI` | No | `mongodb://127.0.0.1:27017/BQRdigital` | MongoDB connection string. |
| `PORT` | No | `1989` | HTTP port used by the Express server. |

The server exits with an error if `API_TOKEN` is missing. Do not commit tokens or other secrets to the repository.

## API reference

All endpoints require this header:

```http
Authorization: Bearer <API_TOKEN>
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/boletos` | List tickets. |
| `GET` | `/api/boletos/:id` | Retrieve one ticket by MongoDB ID. |
| `POST` | `/api/boletos` | Create a ticket. |
| `PUT` | `/api/boletos/:id` | Update a ticket. |
| `DELETE` | `/api/boletos/:id` | Delete a ticket. |

Ticket fields are `Empresa`, `Asiento`, `Origen`, `Destino`, `Fecha`, `Abordaje`, `Salida`, and `Condiciones_Legales`. `Cod_QR` and `Tarifa` are optional. Requests with invalid ticket data receive `400`; missing records receive `404`; missing or invalid tokens receive `401`.

Example request:

```powershell
Invoke-RestMethod http://localhost:1989/api/boletos -Headers @{
  Authorization = "Bearer $env:API_TOKEN"
}
```

QR codes resolve to the ticket API URL for the current host. Since the API is protected, QR-consuming clients must send the same `Authorization: Bearer` header; a regular camera app opening the URL without credentials will receive `401`.

## Security

- Every ticket API operation is protected by a shared Bearer token.
- Provide the token through the browser's password field only in a trusted environment. The current application does not provide individual accounts or roles.
- Use HTTPS whenever the app is reachable over a network; do not expose the shared token or this development server to untrusted users.
- Rotate the token by changing `API_TOKEN` and restarting the server.

## Development and tests

```sh
npm test
npm run build
npm run dev
```

`npm run dev` starts the API with Node.js watch mode. It requires the same
environment variables and a reachable MongoDB instance as `npm start`.

The Node.js compatibility matrix (22 and 24), API/health functionality tests,
token-helper test, and production build run in CI for pushes and pull requests.
Run the local dependency scan with `npm run audit` and its runtime-only variant
with `npm run audit:production`. See the [npm dependency vulnerability
mitigation plan](./DEPENDENCY-SECURITY-PLAN.md) for triage and update policy.

## Dependency security plan

The final full dependency-tree and production-only npm audits reported zero
vulnerabilities on 2026-10-06. For the initial findings, applied remediations,
and ongoing update/verification policy, see
[DEPENDENCY-SECURITY-PLAN.md](./DEPENDENCY-SECURITY-PLAN.md).

## Operational runbook

For the complete procedure to configure MongoDB, start the app, run automated tests, and verify the protected API, see [RUNBOOK.md](./RUNBOOK.md).
