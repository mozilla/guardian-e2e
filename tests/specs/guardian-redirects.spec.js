const { test, expect } = require('@playwright/test');
const { verifyRedirectUrl } = require('../utils/helpers');
const { allure } = require('allure-playwright');
const { getRequest } = require('../utils/helpers');
const { envVariables } = require('../fixtures/envVariables');

let GuardianSpecs;
test.describe.configure({ mode: 'parallel' });

envVariables.forEach((env) => {
  const baseUrl = env.TEST_BASE_URL;
  const expectedBaseUrl = env.TEST_EXPECT_URL;

  test.describe(`${env.TEST_ENV} - guardian redirects`, () => {
    test.beforeAll(async () => {
      const _res = await getRequest(`${env.TEST_BASE_URL}/__version__`);
      GuardianSpecs = _res;
    });

    test.beforeEach(async () => {
      allure.suite(
        `${env.TEST_ENV} - Version: ${GuardianSpecs.version}, Commit: ${GuardianSpecs.commit}`
      );
    });

    test.describe(`redirects for ${baseUrl} origin`, () => {
      test(`Verify redirect for ${baseUrl}, C1538764`, async ({ page }) => {
        const givenBaseUrl = `${expectedBaseUrl}/products/vpn`
        const givenExpectedUrl = `${expectedBaseUrl}/en-US/products/vpn`
        
        await page.goto(givenBaseUrl)
        expect(page.url()).toContain(givenExpectedUrl)
      })

      test(`Verify redirect for ${baseUrl}/r/vpn/invite, C1539666`, async ({
        page
      }) => {
        if (env.TEST_ENV === 'prod') {
          await verifyRedirectUrl(
            page,
            `${baseUrl}/vpn/invite`,
            `${expectedBaseUrl}/en-US/products/vpn/invite/`
          );
        }
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/invite/success, C1539667`, async ({
        page
      }) => {
        const givenBaseUrl =
          env.TEST_ENV === 'stage'
            ? `${baseUrl}/vpn/invite/success`
            : `${baseUrl}/r/vpn/invite/success`;

        const expectedUrl =
          env.TEST_ENV === 'stage'
            ? `${expectedBaseUrl}/en-US/products/vpn/invite/`
            : `${baseUrl}/r/vpn/invite/success`;

        await verifyRedirectUrl(page, givenBaseUrl, expectedUrl);
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
        if (env.TEST_ENV === 'prod') {
          await page.goto(`${baseUrl}/r/vpn/client/feedback`, {
            waitUntil: 'networkidle'
          });

          expect(page.url()).toContain('connect.mozilla.org');
        }
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/upgradeToPrivacyBundle, C1539670`, async ({
        page
      }) => {
        if (env.TEST_ENV === 'stage') {
          await page.goto(`${baseUrl}/r/vpn/upgradeToPrivacyBundle`);
          
          await expect.poll(async () => {
            return page.url()
          }, {
            intervals: [1_000]
          }).toContain('?plan=price_');
        }
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/account, C1539671`, async ({
        page
      }) => {
        const givenExpectedUrl =
          env.TEST_ENV === 'stage'
            ? 'https://accounts.stage.mozaws.net/'
            : 'https://accounts.firefox.com/';

        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/account`,
          givenExpectedUrl
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/subscription, C1539672`, async ({
        page,
      }) => {
        const expectedUrl =
          env.TEST_ENV === 'stage'
            ? 'https://accounts.stage.mozaws.net/'
            : 'https://accounts.firefox.com/'

        await page.goto(`${baseUrl}/r/vpn/subscription`, { waitUntil: 'networkidle' });
        expect(page.url()).toContain(expectedUrl);
      })

      test(`Verify redirect for ${baseUrl}/r/vpn/support, C1539673`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/support`,
          'https://support.mozilla.org/en-US/products/firefox-private-network-vpn'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/subscriptionBlocked, C1539674`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/subscriptionBlocked`,
          'https://support.mozilla.org/en-US/users/auth?next=%2Fen-US%2Fquestions%2Fnew%2Ffirefox-private-network-vpn%2Fform'
        );
      });
    
      test(`Verify redirect for ${baseUrl}/r/vpn/contact, C1539675`, async ({ page }, testInfo) => {
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

      test(`Verify redirect for ${baseUrl}/r/vpn/terms, C1539676`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/terms`,
          'https://www.mozilla.org/en-US/about/legal/terms/subscription-services/'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/, C1539677`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/privacy`,
          'https://www.mozilla.org/en-US/privacy/subscription-services/'
        );
      });
    });

    test.describe('download redirects', () => {
      test(`Verify redirect for ${baseUrl}/r/vpn/download/linux, C1539669`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/download/linux`,
          'https://support.mozilla.org/en-US/kb/how-install-mozilla-vpn-linux-computer'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/update/linux, C1539669`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/update/linux`,
          'https://support.mozilla.org/en-US/kb/how-install-mozilla-vpn-linux-computer'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/update/windows, C1539669`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/update/windows`,
          `${expectedBaseUrl}/en-US/products/vpn/download/`
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/update/ios, C1539669`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/update/ios`,
          'https://apps.apple.com/us/app/firefox-private-network-vpn/id1489407738'
        );
      });

      test(`Verify redirect for ${baseUrl}/r/vpn/update/android, C1539669`, async ({
        page
      }) => {
        await verifyRedirectUrl(
          page,
          `${baseUrl}/r/vpn/update/android`,
          'https://play.google.com/store/apps/details?id=org.mozilla.firefox.vpn'
        );
      });
    });
  });
});
