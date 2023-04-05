const testScenarios = [
  {
    TEST_ENV: 'stage',
    TEST_BASE_URL: 'https://stage-vpn.guardian.nonprod.cloudops.mozgcp.net',
    TEST_EXPECT_URL: 'https://www-dev.allizom.org'
  },
  {
    TEST_ENV: 'prod',
    TEST_BASE_URL: 'https://vpn.mozilla.org',
    TEST_EXPECT_URL: 'https://www.mozilla.org'
  }
];

module.exports = {
  testScenarios
};
