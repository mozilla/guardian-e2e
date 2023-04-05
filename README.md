# guardian-e2e
[![Tests on main](https://github.com/mozilla/guardian-e2e/actions/workflows/pr_or_main_test_run.yml/badge.svg)](https://github.com/mozilla/guardian-e2e/actions/workflows/pr_or_main_test_run.yml)
[![Scheduled Tests](https://github.com/mozilla/guardian-e2e/actions/workflows/e2e.yml/badge.svg)](https://github.com/mozilla/guardian-e2e/actions/workflows/e2e.yml)

End-to-end tests for the Guardian repository.

Also contains tests for some non-Guardian elements that are the responsibility of the PSP team, such as locale strings on the VPN product page (Bedrock).

## To Run

1. `npm install`
1. `npx playwright install`
1. `npm run test:e2e`

## Sentry

When the scheduled tests fail, they send an alert to sentry so that developers are alerted to failures.
