const { env } = require('node:process');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: env.SENTRY_DSN,
});

Sentry.captureMessage("Something went wrong. Please review https://mozilla.github.io/guardian-e2e/");
