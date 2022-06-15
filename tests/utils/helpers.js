const { expect } = require('@playwright/test');
const axios = require('axios');

const verifyUrl = async (page, expectedUrl) =>
  expect(page.url()).toEqual(expectedUrl);

const verifyRedirectUrl = async (page, baseUrl, expectedUrl) => {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  expect(page.url()).toEqual(expectedUrl);
};

const delay = (timeInMilliSeconds) =>
  new Promise(function (resolve) {
    setTimeout(resolve, timeInMilliSeconds);
  });

const getRequest = async (stringUrl) => {
  const res = await axios.get(stringUrl);
  return res.data;
};

module.exports = {
  verifyUrl,
  delay,
  verifyRedirectUrl,
  getRequest
};
