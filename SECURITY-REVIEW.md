# Security review

## Finding

| # | Severity | File | Lines | Vulnerability | Confidence |
|---|----------|------|-------|---------------|------------|
| 1 | 🟠 HIGH | `src/routes/boletosurl.js` | 11-97 (before remediation) | Unauthenticated ticket CRUD allowed anonymous clients to read, create, modify, and delete ticket records. | 9/10 |

**Impact:** An unauthenticated client could enumerate passenger ticket details and alter or delete records.

**Remediation:** Require a shared Bearer token for every ticket API endpoint. The server requires `API_TOKEN`, and requests without a matching token receive `401 Unauthorized`. Automated tests cover missing, invalid, and valid credentials.

**Residual considerations:** The shared token is not an individual identity or role system. QR links point to protected API records, so scanning clients must be able to send the Bearer token. Use HTTPS and keep the token private.
