## 1) Scope / Test Inventory — **[PROVEN]**
- **Backend tests (JUnit / Spring)**
  - Paths:
    - `runningdinner-backend/src/test/java/`
    - `runningdinner-backend/src/test/java/org/runningdinner/test/util/ApplicationTest.java`
    - Examples:
      - `runningdinner-backend/src/test/java/org/runningdinner/admin/RunningDinnerServiceTest.java`
      - `runningdinner-backend/src/test/java/org/runningdinner/admin/RunningDinnerDeletionTest.java`
      - `runningdinner-backend/src/test/java/org/runningdinner/dinnerroute/optimization/DinnerRouteOptimizationServiceTest.java`
      - `runningdinner-backend/src/test/java/org/runningdinner/rest/XssInjectionPreventionTest.java`
- **Webclient unit tests (Vitest)**
  - Paths:
    - `runningdinner-client/webapp/vitest.config.ts`
    - `runningdinner-client/webapp/setupTests.js`
    - Examples:
      - `runningdinner-client/webapp/src/admin/dashboard/Overview.test.tsx`
      - `runningdinner-client/webapp/src/smoke.test.ts`
- **Shared package unit tests (Vitest)**
  - Paths:
    - `runningdinner-client/shared/vitest.config.ts`
    - `runningdinner-client/shared/setupTests.js`
    - Example:
      - `runningdinner-client/shared/src/AddressLocation.spec.jsx`
- **E2E tests (Cypress)**
  - Paths:
    - `e2e-tests/cypress.config.js`
    - `e2e-tests/cypress/integration/`
    - Example:
      - `e2e-tests/cypress/integration/admin/waitinglist.spec.js`
- **Commands (must be verbatim from `package.json`, `pom.xml`, or `.github/workflows`)**
  - Backend (CI executes Maven build including tests)
    - Source: `.github/workflows/build-backend-action.yml` (step `Build and Test`)
      - Verbatim lines:
        ````yaml
        # filepath: .github/workflows/build-backend-action.yml
        - name: Build and Test
          run: |
            cd runningdinner-backend
            mvn package
            java -Djarmode=layertools -jar target/*.jar extract --destination target/extracted/
        ````
    - Source: [`runningdinner-backend/pom.xml`](runningdinner-backend/pom.xml )
      - CI Enforcement: None — reference-only, not executed by CI.
  - Webclient (CI runs monorepo tests)
    - Source: [`.github/workflows/build-webclient-action.yml`](.github/workflows/build-webclient-action.yml ) (step [`Test`](/junit-jupiter-api-5.11.4.jar/org.junit.jupiter.api/Test.class ))
      - Verbatim lines:
        ````yaml
        # filepath: .github/workflows/build-webclient-action.yml
        - name: Test
          run: |
            cd runningdinner-client
            pnpm test
        ````
    - Source: [`runningdinner-client/package.json`](runningdinner-client/package.json )
      - Verbatim lines:
        ````json
        // filepath: runningdinner-client/package.json
        "scripts": {
          "test": "pnpm -r --no-bail test"
        },
        ````
    - Source: [`runningdinner-client/webapp/package.json`](runningdinner-client/webapp/package.json )
      - Verbatim lines:
        ````json
        // filepath: runningdinner-client/webapp/package.json
        "scripts": {
          "test": "vitest run --pass-with-no-tests"
        },
        ````
    - Source: [`runningdinner-client/shared/package.json`](runningdinner-client/shared/package.json )
      - Verbatim lines:
        ````json
        // filepath: runningdinner-client/shared/package.json
        "scripts": {
          "test": "vitest run"
        },
        ````
  - PR workflow entrypoint (no direct test command)
    - Source: [`.github/workflows/build.yml`](.github/workflows/build.yml )
      - CI Enforcement: None — reference-only, not executed by CI.

---

## 2) What Is Tested (by suite) — **[PROVEN]**
- **Backend**
  - Evidence of Spring Boot integration-style tests using shared test annotation:
    - [`runningdinner-backend/src/test/java/org/runningdinner/test/util/ApplicationTest.java`](runningdinner-backend/src/test/java/org/runningdinner/test/util/ApplicationTest.java )
  - Evidence of REST-level test via random-port [`@SpringBootTest`](/spring-boot-test-3.4.3.jar/org.springframework.boot.test.context/SpringBootTest.class ):
    - [`runningdinner-backend/src/test/java/org/runningdinner/rest/XssInjectionPreventionTest.java`](runningdinner-backend/src/test/java/org/runningdinner/rest/XssInjectionPreventionTest.java )
  - Evidence of service/domain flows covered by tests:
    - Admin/service flows:
      - [`runningdinner-backend/src/test/java/org/runningdinner/admin/RunningDinnerServiceTest.java`](runningdinner-backend/src/test/java/org/runningdinner/admin/RunningDinnerServiceTest.java )
      - [`runningdinner-backend/src/test/java/org/runningdinner/admin/RunningDinnerDeletionTest.java`](runningdinner-backend/src/test/java/org/runningdinner/admin/RunningDinnerDeletionTest.java )
    - Optimization flows:
      - [`runningdinner-backend/src/test/java/org/runningdinner/dinnerroute/optimization/DinnerRouteOptimizationServiceTest.java`](runningdinner-backend/src/test/java/org/runningdinner/dinnerroute/optimization/DinnerRouteOptimizationServiceTest.java )
- **Webclient (`webapp`)**
  - Evidence of Vitest + jsdom + setup + junit report output configured:
    - [`runningdinner-client/webapp/vitest.config.ts`](runningdinner-client/webapp/vitest.config.ts )
    - [`runningdinner-client/webapp/setupTests.js`](runningdinner-client/webapp/setupTests.js )
  - Evidence of component/hook tests:
    - [`runningdinner-client/webapp/src/admin/dashboard/Overview.test.tsx`](runningdinner-client/webapp/src/admin/dashboard/Overview.test.tsx )
    - [`runningdinner-client/webapp/src/smoke.test.ts`](runningdinner-client/webapp/src/smoke.test.ts )
- **Shared package (`shared`)**
  - Evidence of Vitest + jsdom + setup + junit report output configured:
    - [`runningdinner-client/shared/vitest.config.ts`](runningdinner-client/shared/vitest.config.ts )
    - [`runningdinner-client/shared/setupTests.js`](runningdinner-client/shared/setupTests.js )
  - Evidence of tests:
    - [`runningdinner-client/shared/src/AddressLocation.spec.jsx`](runningdinner-client/shared/src/AddressLocation.spec.jsx )
- **E2E (Cypress)**
  - Evidence of Cypress config + integration spec structure:
    - [`e2e-tests/cypress.config.js`](e2e-tests/cypress.config.js )
    - [`e2e-tests/cypress/integration`](e2e-tests/cypress/integration )
- **Commands (must be verbatim from `package.json`, `pom.xml`, or [`.github/workflows`](.github/workflows ))**
  - Backend (CI)
    - Source: [`.github/workflows/build-backend-action.yml`](.github/workflows/build-backend-action.yml )
      - Verbatim lines:
        ````yaml
        # filepath: .github/workflows/build-backend-action.yml
        - name: Build and Test
          run: |
            cd runningdinner-backend
            mvn package
            java -Djarmode=layertools -jar target/*.jar extract --destination target/extracted/
        ````
    - Source: [`runningdinner-backend/pom.xml`](runningdinner-backend/pom.xml )
      - CI Enforcement: None — reference-only, not executed by CI.
  - Webclient + shared (CI + package scripts)
    - Source: [`.github/workflows/build-webclient-action.yml`](.github/workflows/build-webclient-action.yml )
      - Verbatim lines:
        ````yaml
        # filepath: .github/workflows/build-webclient-action.yml
        - name: Test
          run: |
            cd runningdinner-client
            pnpm test
        ````
    - Source: [`runningdinner-client/package.json`](runningdinner-client/package.json )
      - Verbatim lines:
        ````json
        // filepath: runningdinner-client/package.json
        "scripts": {
          "test": "pnpm -r --no-bail test"
        },
        ````
    - Source: [`runningdinner-client/webapp/package.json`](runningdinner-client/webapp/package.json )
      - Verbatim lines:
        ````json
        // filepath: runningdinner-client/webapp/package.json
        "scripts": {
          "test": "vitest run --pass-with-no-tests"
        },
        ````
    - Source: [`runningdinner-client/shared/package.json`](runningdinner-client/shared/package.json )
      - Verbatim lines:
        ````json
        // filepath: runningdinner-client/shared/package.json
        "scripts": {
          "test": "vitest run"
        },
        ````
  - PR workflow entrypoint
    - Source: [`.github/workflows/build.yml`](.github/workflows/build.yml )
      - CI Enforcement: None — reference-only, not executed by CI.

---

## 5) Intentionally NOT Covered / Out of Scope — **[PROVEN]**
- **Cypress “reference” examples (not project specs)**
  - Evidence (reference folder exists and contains example specs):
    - [`e2e-tests/cypress/reference`](e2e-tests/cypress/reference )
    - Example files:
      - [`e2e-tests/cypress/reference/2-advanced-examples/assertions.spec.js`](e2e-tests/cypress/reference/2-advanced-examples/assertions.spec.js )
      - [`e2e-tests/cypress/reference/2-advanced-examples/viewport.spec.js`](e2e-tests/cypress/reference/2-advanced-examples/viewport.spec.js )
  - Evidence (“optional cleanup” explicitly calls out `cypress/reference/**`):
    - [`e2e-tests/MIGRATION_SUMMARY.md`](e2e-tests/MIGRATION_SUMMARY.md )
- **Commands (must be verbatim from `package.json`, `pom.xml`, or [`.github/workflows`](.github/workflows ))**
  - CI Enforcement: None — reference-only, not executed by CI.

---

## 6) Troubleshooting / Notes (structure only) — **[PROVEN]**
- Backend test configuration notes (profiles + disabled schedulers / mail flags in tests)
  - Evidence:
    - [`runningdinner-backend/src/test/java/org/runningdinner/test/util/ApplicationTest.java`](runningdinner-backend/src/test/java/org/runningdinner/test/util/ApplicationTest.java )
    - [`runningdinner-backend/src/test/java/org/runningdinner/rest/XssInjectionPreventionTest.java`](runningdinner-backend/src/test/java/org/runningdinner/rest/XssInjectionPreventionTest.java )
- Webclient test environment notes (Vitest setup file for Testing Library cleanup + jest-dom matchers)
  - Evidence:
    - [`runningdinner-client/webapp/setupTests.js`](runningdinner-client/webapp/setupTests.js )
    - [`runningdinner-client/webapp/vitest.config.ts`](runningdinner-client/webapp/vitest.config.ts )
- Cypress troubleshooting notes (config/support file expectations documented)
  - Evidence:
    - [`e2e-tests/MIGRATION_SUMMARY.md`](e2e-tests/MIGRATION_SUMMARY.md )
    - [`e2e-tests/cypress.config.js`](e2e-tests/cypress.config.js )
- **Commands (must be verbatim from `package.json`, `pom.xml`, or [`.github/workflows`](.github/workflows ))**
  - CI Enforcement: None — reference-only, not executed by CI.
