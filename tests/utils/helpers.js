const { expect } = require('@playwright/test');
const axios = require('axios');

const verifyUrl = async (page, expectedUrl) =>
  expect(page.url()).toEqual(expectedUrl);

const verifyRedirectUrl = async (base, expected, options) => {
  options = Object.assign({ status: 200 }, options);

  let redirectResult;
  redirectResult = await axios.get(base, { validateStatus: null, responseType: 'headers' });
  expect(redirectResult.request.res.responseUrl).toEqual(expected);
  expect(redirectResult.status).toEqual(options.status);
};

const delay = (timeInMilliSeconds) =>
  new Promise(function(resolve) {
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
