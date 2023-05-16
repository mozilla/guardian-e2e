const { expect } = require('@playwright/test');
const axios = require('axios');

const verifyUrl = async (page, expectedUrl) =>
  expect(page.url()).toEqual(expectedUrl);

// TODO doc
const verifyRedirectUrl = async (base, expected, options) => {
  options = Object.assign({
    followRedirects: false,
  }, options);

  let redirectResult;
  if (options.followRedirects === true) {
    options = Object.assign({ status: 302 }, options);
    redirectResult = await axios.get(base, { maxRedirects: 0, validateStatus: null });
    expect(redirectResult.headers.location).toEqual(expected);
  } else {
    options = Object.assign({ status: 200 }, options);
    redirectResult = await axios.get(base, { validateStatus: null });
    expect(redirectResult.request.res.responseUrl).toEqual(expected);
  }

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
