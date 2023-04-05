const { env } = require('node:process');
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: env.SENTRY_DSN,
});

Sentry.captureMessage("Something went wrong.");
