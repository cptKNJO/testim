const { expect } = require("chai");
const {
  click,
  go,
  waitForElement,
  waitForText,
  sendCharacter,
  test,
  text,
  type,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators"));

const url = "https://www.npmjs.com/";

describe("npmjs", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("logo", async () => {
    await waitForElement(l("[fill='#231F20']"));
  });
  test("search bar visible", async () => {
    await waitForElement(l("Search_packages"));
  });

  test("invalid terms show 0 results", async () => {
    await type(l("Search_packages"), "jilko");
    await sendCharacter(l("Search_packages"), "\r");
    await waitForText("h2", "0 packages found");
  });

  test("searching valid terms show recommendations", async () => {
    await type(l("Search_packages"), "formidable");
    await waitForElement(l("formidable"));
  });

  test("searching for valid packages shows package page", async () => {
    await type(l("Search_packages"), "formidable");
    await click(l("formidable"));
    await waitForText("h2 > span", "formidable");
  });
});

describe("navigation", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("pricing", async () => {
    await click(l("Pricing"));
    const title = await text("main h1");
    expect(title).to.have.string("Pricing");
  });

  test("documentation", async () => {
    await click(l("Documentation"));
    const title = await text("h1");
    expect(title).to.have.string("Documentation");
  });

  test("community", async () => {
    await click(l("Community"));
    await waitForText(l("npm.community"), "npm.community");
  });
});
