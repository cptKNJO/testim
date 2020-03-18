
const { expect } = require("chai");
const {
  go,
  waitForElement,
  withContext,
  test,
  text,
  l,
  Locator,
} = require("testim");

Locator.set(require("./locators/locators.js"));

const url = "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe";

describe("iframe page loads component", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("check title", async () => {
    await waitForElement(l("<iframe>:_The_Inline_Frame_element"));
  });

  test("html demo loads", async () => {
    await waitForElement("h4");
    const title = await text("h4");
    expect(title).to.equal("HTML");
  });

  test("css tab hidden", async () => {
    const demo = withContext({
      frameSelector: "iframe",
      tabUrl: "*developer.mozilla.org*",
      tabIndex: 0,
    });
    await demo.waitForNoElement("#css-panel");
  });

  test("show css tab on click", async () => {
    const demo = withContext({
      frameSelector: "iframe",
      tabUrl: "*developer.mozilla.org*",
      tabIndex: 0,
    });
    await demo.waitForElement(l("CSS"));
    await demo.click(l("CSS"));
    await demo.waitForElement("#css-panel");
  });

  test("hide html tab when css tab clicked", async () => {
    const demo = withContext({
      frameSelector: "iframe",
      tabUrl: "*developer.mozilla.org*",
      tabIndex: 0,
    });
    await demo.waitForElement("#html-panel");
    await demo.click(l("CSS"));
    await demo.waitForNoElement("#html-panel");
  });
});
