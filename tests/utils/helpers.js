const { expect } = require('@playwright/test');
const axios = require('axios');

const verifyUrl = async (page, expectedUrl) =>
  expect(page.url()).toEqual(expectedUrl);

const verifyRedirectUrl = async (base, expected, options) => {
  const parsedOptions = { ...options, status: 200 };

  const redirectResult = await axios.get(base, { validateStatus: null });
  expect(redirectResult.request.res.responseUrl).toEqual(expected);
  expect(redirectResult.status).toEqual(parsedOptions.status);
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
