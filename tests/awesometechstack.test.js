"use strict";

const expect = require("chai").expect;
const { getCookie, go, resize, test, l, Locator } = require("testim");

describe("cookies", () => {
  beforeEach(async () => {
    await go("https://awesometechstack.com/");
  });

  test("check whether cookie enabled", async () => {
    const cookieData = {
      name: "cookie_control_consent",
      value: true
    };

    const cookie = await getCookie("cookie_control_consent");

    expect(cookie.name).to.eq(cookieData.name);
    expect(cookie.value).to.eq(cookieData.value);
  });
});
