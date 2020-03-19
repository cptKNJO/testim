
const { expect } = require("chai");
const {
  exists,
  go,
  click,
  waitForElement,
  waitForText,
  test,
  text,
  type,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators"));

const url = "https://bundlephobia.com/";

describe("elements present", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("title", async () => {
    const title = await text(".logo");
    expect(title).to.equal("BundlePhobia");
  });

  test("search bar present", async () => {
    const searchBar = await exists("input[placeholder='find package']");
    expect(searchBar).to.equal(true);
  });

  test("empty searches can be made", async () => {
    const searchButtonSelector = "[d='M89.32_86.5L64.25_61.4C77.2_47_";
    await type(l("[placeholder='find_package']"), "");
    await click(l(searchButtonSelector));
  });

  test("scanning a package.json option present", async () => {
    await waitForText(l("Scan_a_package.json_file"), "Scan a package.json file");
  });

  test("searching for valid package works", async () => {
    const searchButtonSelector = "[d='M89.32_86.5L64.25_61.4C77.2_47_";
    await type(l("[placeholder='find_package']"), "lodash");
    await click(l(searchButtonSelector));
    await waitForElement(l("BUNDLE_SIZE_69.2_kB_MINIFIED_24.3_k"));
  });

  test("searching for invalid package returns error", async () => {
    const searchButtonSelector = "[d='M89.32_86.5L64.25_61.4C77.2_47_";
    await type(l("[placeholder='find_package']"), "jijki");
    await click(l(searchButtonSelector));
    await waitForText("h2", "PackageNotFoundError");
  });

  test("returns to index from search results", async () => {
    const searchButtonSelector = "[d='M89.32_86.5L64.25_61.4C77.2_47_";
    await type(l("[placeholder='find_package']"), "lodash");
    await click(l(searchButtonSelector));
    await click(".logo-small");
    const title = await text(".logo");
    expect(title).to.equal("BundlePhobia");
  });
});
