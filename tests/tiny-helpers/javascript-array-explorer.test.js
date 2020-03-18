
const { expect } = require("chai");
const {
  exists,
  go, selectOption, click, test, text, waitForElement, waitForText, l, Locator,
} = require("testim");

Locator.set(require("./locators/locators.js"));

describe("basic elements", () => {
  beforeEach(async () => {
    await go("https://arrayexplorer.netlify.com/");
  });

  test("check title", async () => {
    const title = await text("h1");
    expect(title).to.equal("JavaScript Array Explorer");
  });

  test("language selection present", async () => {
    const languageSelection = await exists(l("Arabic_Bulgarian_Czech_German_Greek"));
    expect(languageSelection).to.equal(true);
  });

  test("language selection works", async () => {
    let label = await text(l("I_have_an_array,_I_would_like_to"));
    expect(label).to.equal("I have an array, I would like to");

    await selectOption(l("[value='es']"));
    label = await text(l("I_have_an_array,_I_would_like_to"));
    expect(label).to.equal("Tengo un array, me gustaría");
  });

  test("usage section visible", async () => {
    await waitForText(l("Usage"), "Usage");
  });

  test("select option for operation visible", async () => {
    await waitForElement(l("[id='firstmethod']"));
  });

  test("link to javascript object explorer", async () => {
    await click(l("Object_Explorer"));
    const title = await text("h1");
    expect(title).to.equal("JavaScript Object Explorer");
  });
});

describe("basic operations", async () => {
  beforeEach(async () => {
    await go("https://arrayexplorer.netlify.com/");
  });

  test("adding elements", async () => {
    await selectOption("#firstmethod > option:nth-child(2)");
    await selectOption("#methodoptions > option:nth-child(2)");
    await waitForText("h2", "Array.splice()");
  });

  test("removing elements", async () => {
    await selectOption("#firstmethod > option:nth-child(3)");
    await selectOption("#methodoptions > option:nth-child(2)");
    await waitForText("h2", "Array.splice()");
  });

  test("finding elements", async () => {
    await selectOption("#firstmethod > option:nth-child(4)");
    await selectOption("#findMethod > option:nth-child(2)");
    await selectOption("#methodoptions > option:nth-child(2)");
    await waitForText("h2", "Array.includes()");
  });

  test("walking over elements", async () => {
    await selectOption("#firstmethod > option:nth-child(5)");
    await selectOption("#methodoptions > option:nth-child(2)");
    await waitForText("h2", "Array.forEach()");
  });

  test("return a string", async () => {
    await selectOption("#firstmethod > option:nth-child(6)");
    await selectOption("#methodoptions > option:nth-child(2)");
    await waitForText("h2", "Array.join()");
  });

  test("ordering", async () => {
    await selectOption("#firstmethod > option:nth-child(7)");
    await selectOption("#methodoptions > option:nth-child(2)");
    await waitForText("h2", "Array.reverse()");
  });

  test("something else", async () => {
    await selectOption("#firstmethod > option:nth-child(8)");
    await selectOption("#methodoptions > option:nth-child(2)");
    await waitForText("h2", "Array.length");
  });
});

describe("adding items", () => {
  beforeEach(async () => {
    await go("https://arrayexplorer.netlify.com/");
    await selectOption("#firstmethod > option:nth-child(2)");
  });

  test("adding to the end of an array", async () => {
    await selectOption("#methodoptions > option:nth-child(3)");
    await waitForText("h2", "Array.push()");
  });

  test("adding to the front of an array", async () => {
    await selectOption("#methodoptions > option:nth-child(4)");
    await waitForText("h2", "Array.unshift()");
  });

  test("concatinating an array", async () => {
    await selectOption("#methodoptions > option:nth-child(5)");
    await waitForText("h2", "Array.concat()");
  });
});
