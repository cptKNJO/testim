const { expect } = require("chai");
const {
  click,
  exists,
  go,
  waitForCode,
  waitForElement,
  waitForText,
  scrollToElement,
  scrollToPosition,
  test,
  text,
  type,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators"));

const url = "https://www.gatsbyjs.org";

describe("main navigation", () => {
  beforeEach(async () => {
    await go(url);
    await waitForCode(() => document.body);
  });

  test("index", async () => {
    await waitForElement(l("Gatsby_Logo"));
  });

  test("docs", async () => {
    await click(l("Docs"));
    const title = await text("h1");
    expect(title).to.have.string("Documentation");
  });

  test("tutorial", async () => {
    await click(l("Tutorial"));
    const title = await text("h1");
    expect(title).to.have.string("Tutorial");
  });

  test("plugins", async () => {
    await click(l("Plugins"));
    const title = await text("h1");
    expect(title).to.have.string("Plugin");
  });

  test("features", async () => {
    await click(l("Features"));
    const title = await text("h1");
    expect(title).to.have.string("Features");
  });

  test("blog", async () => {
    await click(l("Blog"));
    const title = await text("h1");
    expect(title).to.equal("Blog");
  });

  test("showcase", async () => {
    await click(l("Showcase"));
    const title = await text("h1");
    expect(title).to.equal("Featured Sites");
  });

  test("contributing", async () => {
    await click(l("Contributing"));
    const title = await text("h1");
    expect(title).to.have.string("Contributing");
  });
});


describe("docs sidebar navigation", () => {
  beforeEach(async () => {
    await go(`${url}/docs/`);
  });

  test("check default page", async () => {
    await waitForText(l("Gatsby.js_Documentation"), "Gatsby.js Documentation");
  });

  test("scrolling to the end of default sidebar works", async () => {
    await scrollToElement(l(".css-18uemre_>_li:nth-of-type(20)_."), { scrollTarget: l(".css-151gfhx") });
    await click(l(".css-18uemre_>_li:nth-of-type(20)_."));
    await waitForText(l("Gatsby_REPL"), "Gatsby REPL");
  });

  test("scrolling back to the default sidebar beginning works", async () => {
    await scrollToElement(l(".css-18uemre_>_li:nth-of-type(20)_."), { scrollTarget: l(".css-151gfhx") });
    await click(l(".css-18uemre_>_li:nth-of-type(20)_."));
    await waitForText(l("Gatsby_REPL"), "Gatsby REPL");

    await scrollToPosition(0, 0, { scrollTarget: l(".css-151gfhx") });
    await click(l(".css-18uemre_>_li:nth-of-type(1)_.c"));
    await waitForText(l("Gatsby.js_Documentation"), "Gatsby.js Documentation");
  });
});


describe("search", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("search bar exists", async () => {
    const searchBar = await exists(l("[id='doc-search']"));
    expect(searchBar).to.equal(searchBar);
  });

  test("searching for valid terms works", async () => {
    await type(l("[id='doc-search']"), "image");
    await click(l("Gatsby_Image_API"));
    await waitForText(l("[id='gatsby-image']"), "Gatsby Image API");
  });

  test("invalid terms return no result", async () => {
    await type(l("[id='doc-search']"), "jikio");
    await waitForText(l("No_results_found_for_query_\"jikio\""), "No results found for query \"jikio\"");
  });
});
