
const { expect } = require("chai");
const {
  checkbox,
  evaluate,
  exists,
  go,
  click,
  selectOption,
  waitForNoElement,
  test,
  text,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators.js"));

describe("input type", () => {
  beforeEach(async () => {
    await go("https://inputtypes.com/");
  });

  test("title", async () => {
    const title = await text("h1");
    expect(title).to.equal("Input Type Sandbox");
  });

  test("test all validates forms", async () => {
    await click(l("TEST_ALL"));
    const validated = await text(".input-item__validity-display");
    expect(validated).to.have.string("Form submitted!");
  });

  test("add input creates another form", async () => {
    let forms = await evaluate(() => document.querySelectorAll("form").length);
    expect(forms).to.equal(1);
    await click(l("ADD_INPUT"));
    forms = await evaluate(() => document.querySelectorAll("form").length);
    expect(forms).to.equal(2);
  });

  test("default input is text", async () => {
    const inputText = await evaluate(() => document.querySelector(".input-item__display pre").innerText);
    expect(inputText).to.have.string("type=\"text\"");
  });

  test("no remove button shown for single form", async () => {
    const remove = await exists(".input-item__remove-button");
    expect(remove).to.equal(false);
  });

  test("input form can be closed", async () => {
    await click(l("ADD_INPUT"));
    let forms = await evaluate(() => document.querySelectorAll("form").length);
    expect(forms).to.equal(2);

    const remove = await exists(".input-item__remove-button");
    expect(remove).to.equal(true);
    await click(".input-item__remove-button");
    await waitForNoElement(".input-item__remove-button");

    forms = await evaluate(() => document.querySelectorAll("form").length);
    expect(forms).to.equal(1);
  });

  test("required check updates input", async () => {
    let required = await checkbox("[type=\"checkbox\"]");
    expect(required).to.equal(false);
    await click(l("Required"));
    required = await checkbox("[type='checkbox']");
    expect(required).to.equal(true);
  });

  test("form cannot be submitted if empty and required", async () => {
    await click(l("Required"));
    const required = await checkbox("[type='checkbox']");
    expect(required).to.equal(true);

    await click(l("TEST_ALL"));
    const validated = await text(".input-item__validity-display");
    expect(validated).to.have.equal("");
  });

  test("selecting from input type works", async () => {
    await click(l("Input_Type:"));
    await selectOption(l("[value='number']"));
    const inputText = await evaluate(() => document.querySelector(".input-item__display pre").innerText);
    expect(inputText).to.have.string("type='number'");
  });

  test("selecting from pattern type works", async () => {
    await click(l("Pattern:"));
    await selectOption(l("[value='[0-9]*']"));
    const inputText = await evaluate(() => document.querySelector(".input-item__display pre").innerText);
    expect(inputText).to.have.string("pattern='[0-9]*'");
  });

  test("selecting from input mode type works", async () => {
    await click(l("Input_Mode:"));
    await selectOption(l("[name='inputMode']_[value='text']"));
    const inputText = await evaluate(() => document.querySelector(".input-item__display pre").innerText);
    expect(inputText).to.have.string("inputmode='text'");
  });
});
