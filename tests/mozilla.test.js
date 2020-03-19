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

const url = "https://www.mozilla.org/en-US/";

describe("elements present", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("check firefox visible", async () => {
    await waitForText(l("Firefox"), "Firefox");
  });

  test("check subscription form available", async () => {
    await scrollToElement(l("Your_email_address"));
    await waitForElement(l("Your_email_address"));
  });

  test("learn more about us section visible", async () => {
    await scrollToElement(l("Learn_more_about_us"));
    await waitForElement(l("Learn_more_about_us"));
  });

  test("what we are reading section visible", async () => {
    await scrollToElement(l("What_were_reading:"));
    await waitForElement(l("What_were_reading:"));
  });

  test("not for profit section", async () => {
    await scrollToElement(l("Visit_the_Mozilla_Foundation"));
    await waitForElement(l("Visit_the_Mozilla_Foundation"));
  });

  test("open source contribution sectopm", async () => {
    await scrollToElement(l("Explore_Mozilla_technology"));
    await waitForElement(l("Explore_Mozilla_technology"));
  });

  test("navigation present at the top", async () => {
    await waitForCode(() => document.querySelector(".top-header-navigation").offsetTop === 0);
  });
});

describe("screenshots", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("check fullscreen shot", async () => {
    const fullScreenImage = await screenshot.viewport();
    expect(fullScreenImage).to.have.string("jpg");
  });

  test("check element shot", async () => {
    const elementImage = await screenshot.element(".top-header-navigation");
    expect(elementImage).to.have.string("jpg");
  });

  test("check whole page shot", async () => {
    const stitchedImage = await screenshot.stitch();
    expect(stitchedImage).to.have.string("jpg");
  });
});

describe("navigation menu", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("hovering firefox", async () => {
    await hover(l("Firefox"));
    await waitForElement(l("Firefox_Desktop_Browser_Get_the_bro"));
  });

  test("hovering projects", async () => {
    await hover(l("Projects"));
    await waitForElement(l("Common_Voice"));
  });

  test("hovering developers", async () => {
    await hover(l("Developers"));
    await waitForElement(l("Firefox_Developer_Edition"));
  });

  test("hovering about", async () => {
    await hover(l("About"));
    await waitForElement(l("Mozilla"));
  });
});
