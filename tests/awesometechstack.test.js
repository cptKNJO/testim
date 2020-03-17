
const { expect } = require("chai");
const {
  click,
  evaluate,
  exists,
  getCookie,
  go,
  setCookie,
  test,
  text,
  waitForElement,
  l,
  Locator,
} = require("testim");

Locator.set(require("./locators/locators.js"));

describe("navigation", () => {
  beforeEach(async () => {
    await go("https://awesometechstack.com/");
  });

  test("home in beta", async () => {
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

describe.only("cookies", () => {
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

  test.only("cookie popup enables cookie", async () => {
    const cookieData = {
      name: "cookie_control_consent",
      value: "true",
    };

    await waitForElement(".cookieControl__BarButtons");
    await click(".cookieControl__BarButtons button:nth-child(2)");

    const cookie = await getCookie("cookie_control_consent");

    expect(cookie.name).to.eq(cookieData.name);
    expect(cookie.value).to.eq(cookieData.value);

    const clientCookie = await evaluate(() => document.cookie);

    expect(clientCookie).to.have.string("cookie_control_consent");
  });

  test.only("cookie popup does not show up when cookie enabled", async () => {
    await waitForElement(".cookieControl__BarButtons");

    let cookieDisabled = await exists(".cookieControl__BarButtons");
    expect(cookieDisabled).to.equal(true);

    await click(".cookieControl__BarButtons button:nth-child(2)");

    cookieDisabled = await exists(".cookieControl__BarButtons");
    expect(cookieDisabled).to.equal(false);
  });
});
