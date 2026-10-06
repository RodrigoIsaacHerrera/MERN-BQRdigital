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
- [Operational runbook](#operational-runbook)

## Requirements

- Node.js 18 or newer and npm
- MongoDB 5 or newer, running locally or reachable through a MongoDB connection URI

## Quick start

1. Install dependencies:

   ```sh
   npm install
   ```

2. Start MongoDB and configure the application. In PowerShell:

   ```powershell
   $bytes = New-Object byte[] 32
   $rng = [Security.Cryptography.RandomNumberGenerator]::Create()
   $rng.GetBytes($bytes)
   $env:API_TOKEN = [BitConverter]::ToString($bytes).Replace("-", "").ToLowerInvariant()
   $rng.Dispose()
   $env:MONGODB_URI = "mongodb://127.0.0.1:27017/BQRdigital"
   ```

   Keep the generated token private. Set it again in each new terminal session.

3. Build the browser client and start the server:

   ```sh
   npm run build
   npm start
   ```

4. Open <http://localhost:1989>, enter the same API token in the access-token field, and select **Connect**.

The application listens on port `1989` by default. Set `PORT` to use another port. See the [operational runbook](./RUNBOOK.md) for detailed startup, smoke-test, and troubleshooting steps.

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

`npm run dev` starts the API with nodemon. It requires the same environment variables and a reachable MongoDB instance as `npm start`.

## Operational runbook

For the complete procedure to configure MongoDB, start the app, run automated tests, and verify the protected API, see [RUNBOOK.md](./RUNBOOK.md).
