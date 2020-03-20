const { expect } = require("chai");
const {
  checkbox,
  click,
  go,
  waitForText,
  selectOption,
  scrollToElement,
  submit,
  radio,
  test,
  text,
  type,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators"));

const url = "https://redux-form.com/8.2.2/examples/simple/";


describe("simple redux form", () => {
  beforeEach(async () => {
    await go(url);
    await scrollToElement("form");
  });

  test("title", async () => {
    const title = await text("h1");
    expect(title).to.equal("Simple Form Example");
  });

  test("only male is picked under gender", async () => {
    await click(l("Male"));
    const male = await radio(l("Male"));
    expect(male).to.equal(true);

    const female = await radio(l("Female"));
    expect(female).to.equal(false);
    const other = await radio(l("Other"));
    expect(other).to.equal(false);
  });

  test("only female is picked under gender", async () => {
    await click(l("Female"));
    const female = await radio(l("Female"));
    expect(female).to.equal(true);

    const male = await radio(l("Male"));
    expect(male).to.equal(false);
    const other = await radio(l("Other"));
    expect(other).to.equal(false);
  });

  test("only other is picked under gender", async () => {
    await click(l("Other"));
    const other = await radio(l("Other"));
    expect(other).to.equal(true);

    const female = await radio(l("Female"));
    expect(female).to.equal(false);
    const male = await radio(l("Male"));
    expect(male).to.equal(false);
  });


  test("employed status can be checked", async () => {
    let employed = await checkbox(l("Employed"));
    expect(employed).to.equal(false);
    await click(l("Employed"));
    employed = await checkbox(l("Employed"));
    expect(employed).to.equal(true);
  });

  test("values is updated when input changed", async () => {
    await type(l("First_Name"), "Test");
    await waitForText(l("{_\"firstName\":_\"Test\"_}"), "{  \"firstName\": \"Test\"}");
  });

  test("favourite colour can be selected", async () => {
    await click(l("favoriteColor"));
    await selectOption(l("[value='ff0000']"));
  });

  test("clear button works", async () => {
    await type(l("First_Name"), "Test");
    await click(l("Clear_Values"));
    await waitForText(l("Values_undefined"), "Valuesundefined");
  });

  test("form can be submitted empty", async () => {
    await submit("form");
  });
});
