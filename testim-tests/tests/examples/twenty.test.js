"use strict";

// Import Testim Dev Kit methods
const { go, test, describe, beforeEach, text } = require("testim");

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
	
	await click('.Gallery__cta-button___3kPlJ')
	// After click
    const afterPlanets = await evaluate(() =>
      document.querySelectorAll(".theme__content___Fopuf")
    );
    expect(afterPlanets.length).to.eq(9);
  });
});
