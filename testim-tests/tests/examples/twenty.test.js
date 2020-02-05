"use strict";

// Import Testim Dev Kit methods
const {
  go,
  test,
  describe,
  beforeEach,
  type,
  waitForElement,
  evaluate,
  waitForText
} = require("testim");

// Import chai assertion library
const { expect } = require("chai");

describe("Typing in price slider fields", () => {
  beforeEach(async () => {
    await go("http://demo.testim.io");
  });

  test("empty upper limit returns lower limit", async () => {
    const typedText = "";
    await type(".PurpleSlider__input___3H1SF input", typedText);
    await click("h2.Gallery__headline-1___2lHj5");

    // Field has value 100
    const elementText = await evaluate(
      () => document.querySelector(".PurpleSlider__input___3H1SF input").value
    );
    expect(elementText).to.equal("100");

    // At 100, no planets are shown
    const planets = await evaluate(() =>
      document.querySelectorAll(".theme__content___Fopuf")
    );
    expect(planets.length).to.eq(0);
  });

  test("upper limit cannot be lower than lower limit", async () => {
    const typedText = "-1";
    await type(".PurpleSlider__input___3H1SF input", typedText);
    await click("h2.Gallery__headline-1___2lHj5");

    // Field has value 100
    const upperValue = await evaluate(
      () => document.querySelector(".PurpleSlider__input___3H1SF input").value
    );
    expect(upperValue).to.equal("100");

    // At 100, no planets are shown
    const planets = await evaluate(() =>
      document.querySelectorAll(".theme__content___Fopuf")
    );
    expect(planets.length).to.eq(0);
  });

  test("strings typed show NaN", async () => {
    const typedText = "test";
    await type(".PurpleSlider__input___3H1SF input", typedText);
    await click("h2.Gallery__headline-1___2lHj5");

    // Field has value 100
    const upperValue = await evaluate(
      () => document.querySelector(".PurpleSlider__input___3H1SF input").value
    );
    expect(upperValue).to.equal("NaN");

    // At 100, no planets are shown
    const planets = await evaluate(() =>
      document.querySelectorAll(".theme__content___Fopuf")
    );
    expect(planets.length).to.eq(0);
  });
});

describe("Load more", async () => {
  beforeEach(async () => {
    await go("http://demo.testim.io");
  });

  test("shows all elements", async () => {
    // Before click
    const beforePlanets = await evaluate(() =>
      document.querySelectorAll(".theme__content___Fopuf")
    );
    expect(beforePlanets.length).to.eq(6);

    await click(".Gallery__cta-button___3kPlJ");
    // After click
    const afterPlanets = await evaluate(() =>
      document.querySelectorAll(".theme__content___Fopuf")
    );
    expect(afterPlanets.length).to.eq(9);
  });

  test("disabled when no more elements to show", async () => {
    // First click
    await click(".Gallery__cta-button___3kPlJ");
    const beforePlanets = await evaluate(() =>
      document.querySelectorAll(".theme__content___Fopuf")
    );
    expect(beforePlanets.length).to.eq(9);

    await click(".Gallery__cta-button___3kPlJ");
    // After second click
    const afterPlanets = await evaluate(() =>
      document.querySelectorAll(".theme__content___Fopuf")
    );
    expect(afterPlanets.length).to.eq(beforePlanets.length);
  });
});

describe("Log in", async () => {
  beforeEach(async () => {
    await go("http://demo.testim.io/");
  });

  test("log in form shown properly", async () => {
    await click(".NavButton__nav-button___34wHC");
    await waitForText(".Login__headline-1___qo4Tz", "LOGIN");
  });

  test("empty form does not log in", async () => {
    await click(".NavButton__nav-button___34wHC");
    await click(".LoginButton__primary___38GOe")
    const loginTitle = await text(".Login__headline-1___qo4Tz")
    expect(loginTitle).to.equal("LOGIN")
  });

  test("cancel works properly", async () => {
    await click(".NavButton__nav-button___34wHC");
    await waitForText(".Login__headline-1___qo4Tz", "LOGIN");

    await click(".LoginButton__accent___hdTFW");
    const loginTitle = await evaluate(() =>
      document.querySelector(".Login__headline-1___qo4Tz")
    );
    expect(loginTitle).to.be.null;
  });

  test("logging in works", async () => {
    await click(".NavButton__nav-button___34wHC");
    await type("input[type=text]", "test");
    await type("input[type=password]", "test");
    await submit("#login");
    await waitForText(".mui-btn--primary span", "HELLO, JOHN ");
  });

  test("logging out works", async () => {
    await click(".NavButton__nav-button___34wHC");
    await type("input[type=text]", "test");
    await type("input[type=password]", "test");
    await submit("#login");
    await waitForElement(".mui-btn");

    await click(".mui-btn");
    await click(".mui-dropdown a");
    await waitForText(".NavButton__nav-button___34wHC", "LOG IN");
  });
});

describe("Checkout on booking", async () => {
  beforeEach(async () => {
    await go("http://demo.testim.io/");
  });

  test("checkout not shown initially", async () => {
    const checkout = await evaluate(() =>
      document.querySelector(".Checkout__headline-1___2KQaR")
    );
    expect(checkout).to.be.null;
  });

  test("checkout shown on booking", async () => {
    await click(".BookButton__flat___1i5dr")
    await waitForElement(".Checkout__headline-1___2KQaR")
  });
})

describe("Checkout form", async () => {
  beforeEach(async () => {
    await go("http://demo.testim.io/");
    await click(".BookButton__flat___1i5dr")
    await waitForElement(".Checkout__headline-1___2KQaR")
  });

  test("promo code length less than five not accepted", async () => {
  });

  test("promo code decreases total", async () => {
  });

  test("promo code applied only once", async () => {
  });

  test("temperature of planet shown", async () => {
  });

  test("terms and condition initially unchecked", async () => {
  });

  test("terms and condition can be checked", async () => {
  });

  test("total amount properly displayed", async () => {
  });
})