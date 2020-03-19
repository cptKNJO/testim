const { expect } = require("chai");
const {
  go,
  hover,
  waitForCode,
  waitForElement,
  waitForText,
  screenshot,
  scrollToElement,
  test,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators"));

const url = "https://monitor.firefox.com/";

describe("elements present", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("firefox monitor visible", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });

  test("form for checking breaches shown", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });

  test("latest breach added visible", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });

  test("sign up section visible", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });
});

describe("navigation", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("breaches", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });

  test("security tips", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });

  test("firefox apps and services", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });

  test("sign in", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });
});