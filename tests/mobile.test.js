"use strict";

const expect = require("chai").expect;
const {
  go,
  click,
  waitForElement,
  waitForNoElement,
  waitForText,
  text,
  resize,
  test,
  l,
  Locator
} = require("testim");

Locator.set(require("./locators/locators.js"));

const url = "https://www.w3schools.com/";

describe("basic elements", () => {
  beforeEach(async () => {
    await go(url);
    await resize({
      width: 768,
      height: 500
    });
  });

  test("hamburger icon shown", async () => {
    await waitForElement(l("[onclick='w3_open()']"));
  });

  test("translate button shown", async () => {
    await waitForElement(l("Translate_W3Schools"));
  });

  test("search icon shown", async () => {
    await waitForElement(l("HTML"));
  });

  test("dark mode toggler", async () => {
    await waitForElement(l("Toggle_Dark_Code"));
  });

  test("correct first section", async () => {
    await waitForElement(l("Search_W3Schools"));
  });
});

describe("mobile menu", () => {
  beforeEach(async () => {
    await go(url);
    await resize({
      width: 768,
      height: 500
    });
    await waitForElement(l("[onclick='w3_open()']"));
  });

  test("menu opens", async () => {
    await click(l("[onclick='w3_open()']"));
    await waitForElement(l("_TUTORIALS_REFERENCES_EXAMPLES_EXER"));
  });

  test("correct items on the menu", async () => {
    await click(l("[onclick='w3_open()']"));
    await waitForElement(l("_TUTORIALS_REFERENCES_EXAMPLES_EXER"));
    await waitForText(l("TUTORIALS"), "TUTORIALS");
    await waitForText(l("REFERENCES"), "REFERENCES");
    await waitForText(l("EXAMPLES"), "EXAMPLES");
    await waitForText(l("EXERCISES"), "EXERCISES");
  });

  test("menu closes", async () => {
    await click(l("[onclick='w3_open()']"));
    await waitForElement(l("_TUTORIALS_REFERENCES_EXAMPLES_EXER"));

    await click(l("[onclick='w3_close()']"));
    await waitForNoElement(l("_TUTORIALS_REFERENCES_EXAMPLES_EXER"));
  });

  test("menu disappears but exists when resized", async () => {
    await click(l("[onclick='w3_open()']"));
    await waitForElement(l("_TUTORIALS_REFERENCES_EXAMPLES_EXER"));

    await resize({
      width: 1024,
      height: 500
    });

    await waitForNoElement(l("_TUTORIALS_REFERENCES_EXAMPLES_EXER"));
    await waitForElement(l("_TUTORIALS_REFERENCES_EXAMPLES_EXER"), {
      checkVisibility: false
    });
  });
});

describe("mobile menu items", () => {
  beforeEach(async () => {
    await go(url);
    await resize({
      width: 768,
      height: 500
    });
    await waitForElement(l("[onclick='w3_open()']"));
    await click(l("[onclick='w3_open()']"));
    await waitForElement(l("_TUTORIALS_REFERENCES_EXAMPLES_EXER"));
  });

  test("tutorials menu", async () => {
    await click(l("TUTORIALS"));
    await click(l("Learn_HTML"));
    await waitForElement(l("Page_Heading"));
    const heading = await text(l("Page_Heading"));
    expect(heading).to.have.string("HTML Tutorial");
  });

  test("references menu", async () => {
    await click(l("REFERENCES"));
    await click(l("HTML_Tag_Reference"));
    await waitForElement(l("Page_Heading"));
    const heading = await text(l("Page_Heading"));
    expect(heading).to.have.string("HTML Element Reference");
  });

  test("examples menu", async () => {
    await click(l("EXAMPLES"));
    await click(l("HTML_Examples"));
    await waitForElement(l("Page_Heading"));
    const heading = await text(l("Page_Heading"));
    expect(heading).to.have.string("HTML Examples");
  });

  test("exercises menu", async () => {
    await click(l("EXERCISES"));
    await click(l("HTML_Exercises"));
    await waitForElement(l("Page_Heading"));
    const heading = await text(l("Page_Heading"));
    expect(heading).to.have.string("HTML Exercises");
  });
});

describe.only("mobile menu from section", () => {
  beforeEach(async () => {
    await resize({
      width: 768,
      height: 500
    });
    await go("https://www.w3schools.com/html/default.asp");
  });

  test("correct title", async () => {});
  test("home icon present", async () => {});
  test("home icon works", async () => {});
  test("extended navigation menu present", async () => {});
  test("hamburger icon displays section menu", async () => {});
  test("more button shows main menu", async () => {});
});
