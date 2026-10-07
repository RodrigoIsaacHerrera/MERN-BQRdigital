# Security review

## Dependency maintenance

The npm dependency tree was audited on 2026-10-06. The initial lockfile had
22 advisories (2 critical, 12 high, 5 moderate, and 3 low); two were in the
production dependency tree. Patched compatible dependencies and removal of
the vulnerable development-only `nodemon` chain resolved the reported
findings. The final full-tree and production-only audits both reported zero
vulnerabilities. See the [npm dependency vulnerability mitigation
plan](./DEPENDENCY-SECURITY-PLAN.md) for the baseline and update procedure.

The supported runtime is Node.js 22 or newer. Verification used Node.js
24.21.0 and npm 11.19.0. CI tests the application on Node.js 22 and 24,
including the API/health tests, token-generation test, and production client
build.

## Finding

| # | Severity | File | Lines | Vulnerability | Confidence |
|---|----------|------|-------|---------------|------------|
| 1 | 🟠 HIGH | `src/routes/boletosurl.js` | 11-97 (before remediation) | Unauthenticated ticket CRUD allowed anonymous clients to read, create, modify, and delete ticket records. | 9/10 |

**Impact:** An unauthenticated client could enumerate passenger ticket details and alter or delete records.

**Remediation:** Require a shared Bearer token for every ticket API endpoint. The server requires `API_TOKEN`, and requests without a matching token receive `401 Unauthorized`. Automated tests cover missing, invalid, and valid credentials.

**Residual considerations:** The shared token is not an individual identity or role system. QR links point to protected API records, so scanning clients must be able to send the Bearer token. Use HTTPS and keep the token private.
