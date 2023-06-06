const { test, expect } = require('@playwright/test');
const { verifyRedirectUrl } = require('../utils/helpers');
const { allure } = require('allure-playwright');
const { getRequest } = require('../utils/helpers');
const { testScenarios } = require('../fixtures/scenarios');

let GuardianSpecs;
let ProductDetails;
test.describe.configure({ mode: 'parallel' });

testScenarios.forEach((scenario) => {
  const baseUrl = scenario.TEST_BASE_URL;
  const expectedBaseUrl = scenario.TEST_EXPECT_URL;

  test.describe(`${scenario.TEST_ENV} - guardian redirects`, () => {
    test.beforeAll(async () => {
      const _guardian_specs_res = await getRequest(`${scenario.TEST_BASE_URL}/__version__`);
      GuardianSpecs = _guardian_specs_res;

      const _product_details_res = await getRequest(scenario.PRODUCT_DETAILS_URL);
      ProductDetails = _product_details_res;
    });

    test.beforeEach(async () => {
      allure.suite(
        `${scenario.TEST_ENV} - Version: ${GuardianSpecs.version}, Commit: ${GuardianSpecs.commit}`
      );
    });

    test.describe(`redirects for ${baseUrl} origin`, () => {
      test(`Verify redirect for ${baseUrl}, C1538764`, async ({ page }) => {
        const givenBaseUrl = `${expectedBaseUrl}/products/vpn`
        const givenExpectedUrl = `${expectedBaseUrl}/en-US/products/vpn`

        await page.goto(givenBaseUrl)
        expect(page.url()).toContain(givenExpectedUrl)
      })

      test(`Verify redirect for ${baseUrl}/r/vpn/invite, C1539666`, async () => {
        if (scenario.TEST_ENV === 'prod') {
          await verifyRedirectUrl(
            `${baseUrl}/vpn/invite`,
            `${expectedBaseUrl}/en-US/products/vpn/invite/`
          );
        }
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/invite/success, C1539667`, async () => {
        const givenBaseUrl = `${baseUrl}/vpn/invite/success`;
        const expectedUrl = `${expectedBaseUrl}/en-US/products/vpn/invite/`;

        await verifyRedirectUrl(givenBaseUrl, expectedUrl);
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/subscribe, C1539668`, async ({ page }) => {
        await page.goto(`${baseUrl}/r/vpn/subscribe`, { waitUntil: 'networkidle' })
        expect(page.url()).toContain('/en-US/products/vpn/')
      })
    });

    test.describe('Misc redirects', () => {
      test(`Verify redirect for ${baseUrl}/r/vpn/client/feedback, C1539670`, async ({
        page
      }) => {
        if (scenario.TEST_ENV === 'prod') {
          await page.goto(`${baseUrl}/r/vpn/client/feedback`, {
            waitUntil: 'networkidle'
          });

          expect(page.url()).toContain('connect.mozilla.org');
        }
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/upgradeToPrivacyBundle, C1539670`, async ({
        page
      }) => {
        if (scenario.TEST_ENV === 'stage') {
          await page.goto(`${baseUrl}/r/vpn/upgradeToPrivacyBundle`);

          await expect.poll(async () => {
            return page.url()
          }, {
            intervals: [1_000]
          }).toContain('?plan=price_');
        }
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/account, C1539671`, async () => {
        const givenExpectedUrl =
          scenario.TEST_ENV === 'stage'
            ? 'https://accounts.stage.mozaws.net/'
            : 'https://accounts.firefox.com/';

        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/account`,
          givenExpectedUrl
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/subscription, C1539672`, async ({
        page,
      }) => {
        const expectedUrl =
          scenario.TEST_ENV === 'stage'
            ? 'https://accounts.stage.mozaws.net/'
            : 'https://accounts.firefox.com/'

        await page.goto(`${baseUrl}/r/vpn/subscription`, { waitUntil: 'networkidle' });
        expect(page.url()).toContain(expectedUrl);
      })

      test(`Verify redirect for ${baseUrl}/r/vpn/support, C1539673`, async () => {
        const prodRes = 'products/firefox-private-network-vpn'
        const stageRes = 'products/firefox-private-network-vpn'

        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/support`,
          `https://support.mozilla.org/en-US/${scenario.TEST_ENV === 'stage' ? stageRes : prodRes}`
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/subscriptionBlocked, C1539674`, async () => {
        const prodRes = 'products/firefox-private-network-vpn'
        const stageRes = 'products/firefox-private-network-vpn'

        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/subscriptionBlocked`,
          `https://support.mozilla.org/en-US/${scenario.TEST_ENV === 'stage' ? stageRes : prodRes}`
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/contact, C1539675`, async ({ page }) => {
        const expectedUrl = 'https://accounts.firefox.com/'

        await page.goto(`${baseUrl}/r/vpn/contact`, { waitUntil: 'networkidle' })
        await expect.poll(async () => {
          return page.url()
        }, {
          // wait at 2 sec in between
          intervals: [2_000],
          // Poll for 10 seconds; defaults to 5 seconds. Pass 0 to disable timeout.
          timeout: 10000,
        }).toContain(expectedUrl);
      })

      test(`Verify redirect for ${baseUrl}/r/vpn/terms, C1539676`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/terms`,
          'https://www.mozilla.org/en-US/about/legal/terms/subscription-services/'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/, C1539677`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/privacy`,
          'https://www.mozilla.org/en-US/privacy/subscription-services/'
        );
      });
    });

    test.describe('download redirects', () => {
      test(`Verify redirect for ${baseUrl}/r/vpn/download/linux, C1539669`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/download/linux`,
          'https://support.mozilla.org/en-US/kb/how-install-mozilla-vpn-linux-computer'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/download/windows, C1539669`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/download/windows`,
          `${scenario.PACKAGE_ARCHIVE_URL_BASE}/releases/${ProductDetails.latest.WINDOWS}/windows/MozillaVPN.msi`
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/download/macos, C1539669`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/download/macos`,
          `${scenario.PACKAGE_ARCHIVE_URL_BASE}/releases/${ProductDetails.latest.MACOS}/mac/MozillaVPN.pkg`
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/update/linux, C1539669`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/update/linux`,
          'https://support.mozilla.org/en-US/kb/how-install-mozilla-vpn-linux-computer'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/update/windows, C1539669`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/update/windows`,
          `${expectedBaseUrl}/en-US/products/vpn/download/`
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/update/ios, C1539669`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/update/ios`,
          'https://apps.apple.com/us/app/firefox-private-network-vpn/id1489407738'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/update/android, C1539669`, async () => {
        await verifyRedirectUrl(
          `${baseUrl}/r/vpn/update/android`,
          'https://play.google.com/store/apps/details?id=org.mozilla.firefox.vpn'
        );
      });
    });
  });
});
