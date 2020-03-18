
const { expect } = require("chai");
const {
  click,
  evaluate,
  getCookie,
  go,
  scrollToPosition,
  setCookie,
  test,
  text,
  waitForElement,
  waitForText,
  l,
  Locator,
} = require("testim");

Locator.set(require("./locators/locators.js"));

describe("navigation", () => {
  beforeEach(async () => {
    await go("https://awesometechstack.com/");
  });

  test("index", async () => {
    const title = (await text("h1")).trim();
    expect(title).to.equal("Website Tech Stack Analysis");
  });

  test("technologies", async () => {
    await click(l("Technologies"));
    const title = (await text("h1")).trim();
    expect(title).to.equal("Technologies");
  });

  test("how it works", async () => {
    await click(l("How_it_works"));
    const title = (await text("h1")).trim();
    expect(title).to.equal("How it works");
  });

  test("contact", async () => {
    await click(l("Contact"));
    const title = await text("h1:nth-child(2)");
    expect(title).to.have.string("contact us");
  });
});

describe("cookies", () => {
  beforeEach(async () => {
    await go("https://awesometechstack.com/");
  });

  test("ensure cookie not enabled by default", async () => {
    const clientCookie = await evaluate(() => document.cookie);

    expect(clientCookie).to.not.have.string("cookie_control_consent");
  });

  test("enabling cookie works", async () => {
    const cookieData = {
      name: "cookie_control_consent",
      value: "true",
    };

    await setCookie(cookieData);

    const cookie = await getCookie("cookie_control_consent");

    expect(cookie.name).to.eq(cookieData.name);
    expect(cookie.value).to.eq(cookieData.value);

    const clientCookie = await evaluate(() => document.cookie);

    expect(clientCookie).to.have.string("cookie_control_consent");
  });

  test("cookie popup enables cookie", async () => {
    const cookieData = {
      name: "cookie_control_consent",
      value: "true",
      expires: new Date(new Date().valueOf() + 1000),
    };

    await waitForElement(".cookieControl__BarButtons");
    await click(".cookieControl__BarButtons button:nth-child(2)");

    const cookie = await getCookie("cookie_control_consent");

    expect(cookie.name).to.eq(cookieData.name);
    expect(cookie.value).to.eq(cookieData.value);

    const clientCookie = await evaluate(() => document.cookie);

    expect(clientCookie).to.have.string("cookie_control_consent");
  });
});


describe.only("home", () => {
  beforeEach(async () => {
    await go("https://awesometechstack.com/");
  });

  test("check if two analysis forms shown", async () => {
    await waitForElement("form");
    const noOfForms = await evaluate(() => document.querySelectorAll("form").length);
    expect(noOfForms).to.equal(2);
  });

  test("website section", async () => {
    const y = await evaluate(() => document.querySelector("#websites").getBoundingClientRect().y);
    const x = await evaluate(() => document.querySelector("#websites").getBoundingClientRect().x);
    await scrollToPosition(
      x, y,
    );
    await waitForText("#websites h2", "Websites");
  });

  test("technologies section", async () => {
    const y = await evaluate(() => document.querySelector("#technologies").getBoundingClientRect().y);
    const x = await evaluate(() => document.querySelector("#technologies").getBoundingClientRect().x);
    await scrollToPosition(
      x, y,
    );
    await waitForText("#technologies h2", "Technologies");
  });

  test("in beta is visible", async () => {
    const beta = await evaluate(() => document.querySelector("h1").previousElementSibling.innerText);
    expect(beta).to.equal("BETA");
  });

  test("button for websites takes to proper section", async () => {
    await click(".icon-hero-btn");
    await waitForText("#websites h2", "Websites");
  });

  test("button for technologies takes to proper section", async () => {
    await click(".icon-trending-up");
    await waitForText("#technologies h2", "Technologies");
  });
});
