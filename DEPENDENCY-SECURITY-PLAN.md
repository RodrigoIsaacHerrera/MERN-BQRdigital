# npm dependency vulnerability mitigation plan

## Current scope

The project uses npm with a committed `package-lock.json`. Keep dependency
updates reproducible with `npm ci`; do not upgrade packages based only on a
version number or use `npm audit fix --force` without a reviewed migration.

## Baseline and remediation (2026-10-06)

The initial locked tree reported 22 advisories: 2 critical, 12 high, 5
moderate, and 3 low. The production-only tree reported 2 (one moderate and
one low). Compatible `npm audit fix` updates resolved patched transitive
dependencies. It left three high findings in the development-only
`nodemon` → `chokidar` → `braces` chain; npm offered no compatible fix and
recommended a breaking downgrade. Since the supported Node.js minimum is 22,
the project now uses built-in `node --watch` for `npm run dev` and removes
`nodemon`.

After remediation, `npm run audit` and `npm run audit:production` both
reported zero vulnerabilities. On Node.js 24.21.0 with npm 11.19.0,
`npm test` passed (6 tests), `npm run test:token` passed, and
`npm run build` completed successfully. CI also runs these checks on Node.js
22 and 24.

Include the age and support status of the top-level packages in the baseline
review, especially major upgrades that affect runtime or compatibility:
Mongoose and its MongoDB driver, Express, React, and the Babel/webpack build
toolchain. A package without a reported advisory may still need an upgrade if
it is no longer maintained.

## Triage and remediation

1. **Establish a baseline.** Run `npm audit --json` and
   `npm audit --omit=dev --json`; record each affected package, severity,
   dependency path, available patched version, and whether production code
   reaches the vulnerable feature. Treat scanner output as a starting point,
   not proof of exploitability.
2. **Prioritize fixes.** Address exploitable critical issues immediately;
   address high severity issues within 7 days, medium within 30 days, and low
   within 90 days. If no compatible fix exists, document exposure, mitigations,
   an owner, and a review date; do not silently suppress the advisory.
3. **Apply the smallest safe update.** Prefer a patched release within the
   current major version. Review the changelog and dependency tree, update
   `package.json` and `package-lock.json` together, and avoid `--force`.
   Schedule major-version migrations separately and verify their API and
   database compatibility before rollout.
4. **Verify before release.** On every dependency change, run `npm ci`,
   `npm test`, `npm run test:token`, `npm run build`, and both audit commands.
   Review lockfile changes and exercise the ticket API against a staging
   MongoDB deployment before releasing runtime or database-driver upgrades.
5. **Keep the baseline current.** Review npm audit results monthly and whenever
   an advisory or dependency update is raised. Re-run the audit after every
   lockfile change and record remaining accepted risks in the security review.

## Compatibility guardrail

The application supports Node.js 22 and newer. CI runs the functional tests,
token-generation test, and production build on Node.js 22 and 24. Keep Node.js
22 as the minimum tested runtime and add a newer supported LTS release to the
matrix as the runtime policy changes. A dependency update is not ready until
the complete matrix passes.

## Commands

```sh
npm ci
npm audit --json
npm audit --omit=dev --json
npm test
npm run test:token
npm run build
```

The `npm run audit` and `npm run audit:production` shortcuts fail on high or
critical findings. Use the `--json` commands above when triaging advisories.
