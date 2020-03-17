
const { expect } = require("chai");
const {
  go,
  waitForElement,
  waitForNoElement,
  waitForText,
  click,
  scrollToElement,
  test,
  text,
  type,
  l,
  Locator,
} = require("testim");

Locator.set(require("./locators/locators.js"));

const url = "https://www.w3schools.com/howto/howto_js_navbar_hide_scroll.asp";

describe("navigation", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("direct navigation works", async () => {
    await waitForText(
      l("How_TO_-_Hide_Menu_on_Scroll"),
      "How TO - Hide Menu on Scroll",
    );
  }); // end of test

  test("clicking next navigates to next item", async () => {
    await click(l("Next_"));
    await waitForText(
      l("How_TO_-_Shrink_Navigation_Menu_on_"),
      "How TO - Shrink Navigation Menu on Scroll",
    );
  });

  test("clicking previous navigates to previous item", async () => {
    await click(l("_Previous"));
    await waitForText(
      l("How_TO_-_Slide_Down_a_Bar_on_Scroll"),
      "How TO - Slide Down a Bar on Scroll",
    );
  });

  test("scroll up", async () => {
    await scrollToElement(l("[id='leftmenuinnerinner']_>_:nth-ch"), {
      scrollTarget: l("[id='leftmenuinnerinner']"),
    });
    await click(l("[id='leftmenuinnerinner']_>_:nth-ch"));
    await waitForElement(l("W3Schools_How_To"));
  });

  test("scroll down", async () => {
    await scrollToElement(l("[id='leftmenuinnerinner']_>_:nth-ch"), {
      scrollTarget: l("[id='leftmenuinnerinner']"),
    });
    await click(l("[id='leftmenuinnerinner']_>_:nth-ch"));
    await waitForElement(l("How_TO_-_Responsive_Header"));
  });
});

describe("sidebar search", () => {
  beforeEach(async () => {
    await go(url);
    await scrollToElement(l(".searchinput"), {
      scrollTarget: l("[id='leftmenuinnerinner']"),
    });
  });

  test("search bar available", async () => {
    await waitForElement(l(".searchinput"));
  });

  test("valid terms show result", async () => {
    await click(l(".searchinput"));
    await type(l(".searchinput"), "slide");
    const term = await text(l("Slide_Down_Bar_on_Scroll"));
    expect(term).to.have.string("Slide");
  });

  test("invalid terms do not show result", async () => {
    await waitForElement("#leftmenuinnerinner > h2.left");
    await click(l(".searchinput"));
    await type(l(".searchinput"), "slide h");
    await waitForNoElement("#leftmenuinnerinner > h2.left");
  });
});
