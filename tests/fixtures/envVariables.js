const envVariables = [
  {
    TEST_ENV: 'stage',
    TEST_BASE_URL: 'https://stage-vpn.guardian.nonprod.cloudops.mozgcp.net',
    TEST_EXPECT_URL: 'https://www-dev.allizom.org',
    PRODUCT_DETAILS_URL: 'https://mozilla.github.io/mozillavpn-product-details/mozillavpn.json',
    PACKAGE_ARCHIVE_URL_BASE: 'https://archive.mozilla.org/pub/vpn',
  },
  {
    TEST_ENV: 'prod',
    TEST_BASE_URL: 'https://vpn.mozilla.org',
    TEST_EXPECT_URL: 'https://www.mozilla.org',
    PRODUCT_DETAILS_URL: 'https://mozilla.github.io/mozillavpn-product-details/mozillavpn.json',
    PACKAGE_ARCHIVE_URL_BASE: 'https://archive.mozilla.org/pub/vpn',
  }
];

module.exports = {
  envVariables
};
