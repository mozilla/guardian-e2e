const { test, expect } = require('@playwright/test');
const { supportedLocales } = require('../fixtures/locales');
const { allure } = require('allure-playwright');
const { getRequest } = require('../utils/helpers');
const { testScenarios } = require('../fixtures/scenarios');

test.describe.configure({ mode: 'parallel' });

testScenarios.forEach((scenario) => {
  const baseUrl = scenario.TEST_EXPECT_URL;

  // C1538755 - Verify that PN and TOS are translated for each one of the new regions
  test.describe(`${scenario.TEST_ENV} - guardian basics - privacy, C1538755`, () => {
    let guardianSpecs;

    test.beforeAll(async () => {
      const _res = await getRequest(`${scenario.TEST_BASE_URL}/__version__`);
      guardianSpecs = _res;
    });

    test.use({ viewport: { width: 1980, height: 1080 } });
    for (const locale of supportedLocales) {
      test.describe('Checking locales for different langs and geos', () => {
        test.beforeEach(async ({ page }) => {
          allure.suite(
            `${scenario.TEST_ENV} - Version: ${guardianSpecs.version}, Commit: ${guardianSpecs.commit}`
          );
          await page.goto(
            `${baseUrl}/${locale.lang}/products/vpn/?geo=${locale.geo}`,
            {
              waitUntil: 'networkidle'
            }
          );
        });

        test(`Verify locale handling in ${locale.name} for privacy notice`, async ({
          page
        }) => {
          const privacyLink = page.locator(
            'footer .vpn-footer-list > li:nth-child(1) > a:nth-child(1)'
          );

          await Promise.all([
            privacyLink.click(),
            page.waitForNavigation({ waitUntil: 'networkidle' })
          ]);
          const privacyTitle = await page
            .locator('.privacy-title')
            .textContent();
          expect(privacyTitle).toContain(locale.expectedPrivacyTitle);
        });
      });
    }
  });
});
