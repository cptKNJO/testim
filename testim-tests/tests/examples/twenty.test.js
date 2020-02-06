"use strict";

// Import Testim Dev Kit methods
const {
  beforeEach,
  checkbox,
  click,
  describe,
  evaluate,
  go,
  test,
  text,
  type,
  waitForElement,
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
    const numberOfPlanets = await evaluate(
      () => document.querySelectorAll(".theme__content___Fopuf").length
    );
    expect(numberOfPlanets).to.equal(0);
  });

  test("upper limit cannot be negative", async () => {
    const typedText = "-1";
    await type(".PurpleSlider__input___3H1SF input", typedText);
    await click("h2.Gallery__headline-1___2lHj5");

    // Field has value 100
    const upperValue = await evaluate(
      () => document.querySelector(".PurpleSlider__input___3H1SF input").value
    );
    expect(upperValue).to.equal("NaN");

    // At 100, no planets are shown
    const numberOfPlanets = await evaluate(
      () => document.querySelectorAll(".theme__content___Fopuf").length
    );
    expect(numberOfPlanets).to.equal(0);
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
    const numberOfPlanets = await evaluate(
      () => document.querySelectorAll(".theme__content___Fopuf").length
    );
    expect(numberOfPlanets).to.equal(0);
  });
});

describe("Load more", async () => {
  beforeEach(async () => {
    await go("http://demo.testim.io");
  });

  test("shows all elements", async () => {
    // Before click
    const beforePlanets = await evaluate(
      () => document.querySelectorAll(".theme__content___Fopuf").length
    );
    expect(beforePlanets).to.equal(6);

    await click(".Gallery__cta-button___3kPlJ");
    // After click
    const afterPlanets = await evaluate(
      () => document.querySelectorAll(".theme__content___Fopuf").length
    );
    expect(afterPlanets).to.equal(9);
  });

  test("disabled when no more elements to show", async () => {
    // First click
    await click(".Gallery__cta-button___3kPlJ");
    const beforePlanets = await evaluate(
      () => document.querySelectorAll(".theme__content___Fopuf").length
    );
    expect(beforePlanets).to.equal(9);

    await click(".Gallery__cta-button___3kPlJ");
    // After second click
    const afterPlanets = await evaluate(
      () => document.querySelectorAll(".theme__content___Fopuf").length
    );
    expect(afterPlanets).to.eq(9);
  });
});

describe("Log in", async () => {
  beforeEach(async () => {
    await go("http://demo.testim.io/");
  });

  test("log in form shown properly", async () => {
    await click(".NavButton__nav-button___34wHC");
    await waitForText(".Login__headline-1___qo4Tz", "Login");
  });

  test("empty form does not log in", async () => {
    await click(".NavButton__nav-button___34wHC");
    await click(".LoginButton__primary___38GOe");
    const loginTitle = await text(".Login__headline-1___qo4Tz");
    expect(loginTitle).to.equal("Login");
  });

  test("cancel works properly", async () => {
    await click(".NavButton__nav-button___34wHC");
    await waitForText(".Login__headline-1___qo4Tz", "Login");

    await click(".LoginButton__accent___hdTFW");
    const loginTitle = await evaluate(() =>
      document.querySelector(".Login__headline-1___qo4Tz")
    );
    expect(loginTitle).to.be.null;
  });

  test("logging in works", async () => {
    await click(".NavButton__nav-button___34wHC");
    await type(".Login__field___2oefU input[type=text]", "test");
    await type(".Login__field___2oefU input[type=password]", "test");
    await click(".LoginButton__primary___38GOe");
    await waitForElement(".mui-btn");
  });

  test("logging out works", async () => {
    await click(".NavButton__nav-button___34wHC");
    await type(".Login__field___2oefU input[type=text]", "test");
    await type(".Login__field___2oefU input[type=password]", "test");
    await click(".LoginButton__primary___38GOe");
    await waitForElement(".mui-btn");

    await click(".mui-btn");
    await click(".mui-dropdown a");
    await waitForText(".NavButton__nav-button___34wHC", "Log in");
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
    await click(".BookButton__flat___1i5dr");
    await waitForElement(".Checkout__headline-1___2KQaR");
  });
});

describe("Checkout form", async () => {
  beforeEach(async () => {
    await go("http://demo.testim.io/");
    await click(".BookButton__flat___1i5dr");
    await waitForElement(".Checkout__headline-1___2KQaR");
  });

  test("promo code length less than five not accepted", async () => {
    const beforeTotal = await text(".OrderSummary__headline-1___1lzsL");
    await type("input[name=promo]", "1234");
    await click(".OrderSummary__apply-button___3Cjeq");
    const afterTotal = await text(".OrderSummary__headline-1___1lzsL");
    expect(beforeTotal).to.equal(afterTotal);
  });

  test("promo code decreases total", async () => {
    const beforeTotal = await text(".OrderSummary__headline-1___1lzsL");
    await type("input[name=promo]", "12345");
    await click(".OrderSummary__apply-button___3Cjeq");
    const afterTotal = await text(".OrderSummary__headline-1___1lzsL");
    expect(beforeTotal).to.not.equal(afterTotal);
    expect(afterTotal).to.equal("$946.77");
  });

  test("promo code is applied only once", async () => {
    await type("input[name=promo]", "12345");
    await click(".OrderSummary__apply-button___3Cjeq");
    const firstTotal = await text(".OrderSummary__headline-1___1lzsL");
    expect(firstTotal).to.equal("$946.77");

    await click(".OrderSummary__apply-button___3Cjeq");
    const secondTotal = await text(".OrderSummary__headline-1___1lzsL");
    expect(secondTotal).to.equal(firstTotal);
  });

  test("temperature of planet shown", async () => {
    await waitForElement(".Climate__headline-1___pmwAe");
  });

  test("terms and condition initially unchecked", async () => {
    const isChecked = await checkbox(".theme__check___2B20W");
    expect(isChecked).to.equal(false);
  });

  test("total amount properly displayed", async () => {
    const total = await text(".OrderSummary__headline-1___1lzsL");
    expect(total).to.equal("$1,183.46");
  });

  test("pay now disabled without valid input", async () => {
    const payNow = await evaluate(() =>
      document
        .querySelector(".OrderSummary__pay-button___1CG2e")
        .getAttribute("disabled")
    );
    expect(payNow).to.equal("");
  });

  test("pay now clickable with valid input", async () => {
    // Fill customer information and check terms and conditions
    await type(".CustomerInfo__input___eFffe:nth-child(1) input", "test");
    await type(
      ".CustomerInfo__input___eFffe:nth-child(2) input",
      "test@example.com"
    );
    await type(
      ".CustomerInfo__input___eFffe:nth-child(3) input",
      "000-00-0000"
    );
    await type(
      ".CustomerInfo__input___eFffe:nth-child(4) input",
      "0191 498 0120"
    );
    await click(".theme__check___2B20W");

    const payNow = await evaluate(() =>
      document
        .querySelector(".OrderSummary__pay-button___1CG2e")
        .getAttribute("disabled")
    );
    expect(payNow).to.be.null;
  });
});
