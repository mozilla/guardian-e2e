const { test, expect } = require('@playwright/test');
const { supportedLocalesWithCurrency } = require('../fixtures/locales');
const { allure } = require('allure-playwright');
const { getRequest } = require('../utils/helpers');
const { testScenarios } = require('../fixtures/scenarios');

test.describe.configure({ mode: 'parallel' });

const urlForScenarioAndRegion = function(scenario, locale) {
  let baseURL = scenario.TEST_EXPECT_URL;
  let urlString = `${baseURL}/${locale.lang}/products/vpn/`;
  if (scenario.TEST_ENV === "stage") {
    urlString += `?geo=${locale.geo}`;
  }
  return urlString;
}

testScenarios.forEach((scenario) => {
  /**
    * C1538754 - Verify that 3 subscriptions plans are displayed
    *            correctly in VPN homepage for each of the new regions
    * C1601703 - Verify that pricing and currency are displayed
    *            correctly in VPN homepage for each of the new regions
    *
    * These tests make assertions about the values of localized strings in
    * various regions and locales. It is important to note that on stage, it is
    * possible to simulate the page a user will see in a different region by
    * setting the `geo` URL query parameter. For the purpose of these tests,
    * this affects the currency displayed to the user, while the locale (set in
    * the URL itself) changes the displayed language.
    *
    * Setting the `geo` parameter has no effect on production (see
    * https://github.com/mozilla/bedrock/issues/12967#issuecomment-1498694421)
    * and therefore it is only possible to test the variation of locale in
    * prod. The currency value that is rendered in prod is determined by the
    * physical location in which the tests are carried out. Since these tests
    * run on a US server in CI, this is what the production currency is set to.
    *
    */
  test.describe(
    `${scenario.TEST_ENV} - guardian localization by urls, C1538754, C1601703`,
    () => {
      let guardianSpecs;

      test.beforeAll(async () => {
        const _res = await getRequest(`${scenario.TEST_BASE_URL}/__version__`);
        guardianSpecs = _res;
      });

      for (const locale of supportedLocalesWithCurrency) {
        test.describe(
          `${locale.name} - ${urlForScenarioAndRegion(scenario, locale)}`,
          () => {
            test.beforeEach(async ({ page }) => {
              allure.suite(
                `${scenario.TEST_ENV} - Version: ${guardianSpecs.version}, Commit: ${guardianSpecs.commit}`
              );
              await page.goto(
                urlForScenarioAndRegion(scenario, locale),
                {
                  waitUntil: 'networkidle'
                }
              );
            });

            test(`Verify locale handling in ${locale.name}`, async ({
              page
            }) => {
              const pricingTables = await page
                .locator('#pricing .vpn-content-block')
                .count();
              expect(pricingTables).toEqual(2);

              const monthPlanPrice = await page
                .locator('#pricing .vpn-monthly-price-display')
                .first()
                .textContent();

              const expectedMonthlyPrice =
                scenario.TEST_ENV === 'stage' ? locale.stageExpect : locale.expect;
              expect(
                monthPlanPrice,
                `${monthPlanPrice} for ${locale.name} did not match expected ${locale.expect}`
              ).toEqual(expectedMonthlyPrice);
            });
          }
        );
      }
    }
  );
});
