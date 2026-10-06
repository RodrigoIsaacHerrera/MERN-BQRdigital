# BQRdigital operational runbook

This runbook covers local setup, automated checks, startup, and API verification.

## 1. Prerequisites

- Node.js 18+ and npm are available in the terminal.
- MongoDB is installed and running, or a MongoDB URI is available.
- The repository dependencies are installed with `npm install`.

## 2. Configure and start

Open PowerShell in the repository directory and configure the server:

```powershell
$bytes = New-Object byte[] 32
$rng = [Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:API_TOKEN = [BitConverter]::ToString($bytes).Replace("-", "").ToLowerInvariant()
$rng.Dispose()
$env:MONGODB_URI = "mongodb://127.0.0.1:27017/BQRdigital"
$env:PORT = "1989"
```

Keep the token value available for the smoke tests and enter it in the browser UI. The token is held in the page's memory and must be entered again after a reload.

Build the client bundle and start the application:

```powershell
npm run build
npm start
```

Wait for the `MongoDB connected. Server listening...` message, then open <http://localhost:1989>. Enter `API_TOKEN` into **API access token** and select **Connect** to load tickets. In development, use `npm run dev` instead of `npm start`.

The server will not start without `API_TOKEN` and will not begin listening until MongoDB connects. If you change `PORT`, use that port in the browser and smoke-test URL.

## 3. Run automated tests

In another terminal:

```powershell
npm test
```

The API and authentication tests use an in-memory fake ticket model and do not require MongoDB or a running application.

## 4. Verify the protected API

Use a second PowerShell terminal. Set the same values used by the server:

```powershell
$env:API_TOKEN = "<the token configured in the server terminal>"
$baseUrl = "http://localhost:1989"
```

An unauthenticated request must be rejected:

```powershell
try {
  Invoke-RestMethod "$baseUrl/api/boletos"
} catch {
  $_.Exception.Response.StatusCode
}
```

Expected result: `Unauthorized` (`401`).

An authenticated request should return a JSON array (empty if there are no tickets):

```powershell
Invoke-RestMethod "$baseUrl/api/boletos" -Headers @{
  Authorization = "Bearer $env:API_TOKEN"
}
```

The browser's **Connect** action performs this authenticated list request. Ticket create, edit, and delete actions should work after connecting. QR codes resolve to `/api/boletos/:id`; scanners need a client capable of sending the same Bearer token.

## 5. Troubleshooting

| Symptom | Checks |
| --- | --- |
| Server exits with `API_TOKEN is required` | Set a non-empty `$env:API_TOKEN` in the server terminal before starting the app. |
| MongoDB connection failure | Confirm MongoDB is running and `MONGODB_URI` is correct and reachable. |
| Browser shows `401` | Confirm the token entered in the UI exactly matches the server's `API_TOKEN`; restart the server after rotating it. |
| Browser cannot connect | Confirm the server's listening port and open the matching local URL. |
| Build or test command is missing | Confirm Node.js 18+ and npm are installed, then run `npm install`. |
