const {
  click,
  go,
  waitForElement,
  waitForText,
  selectOption,
  scrollToElement,
  test,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators"));

const url = "https://www.nhs.uk/live-well/healthy-weight/bmi-calculator/";

describe("bmi calculator", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("title", async () => {
    await waitForElement(l("[fill='#005eb8']"));
  });

  test("calculator available", async () => {
    await scrollToElement(l("[id='antbits-bmi-calc_btn']"));
    await waitForElement(l("[id='antbits-bmi-calc_btn']"));
  });

  test("form cannot be submitted without input", async () => {
    await scrollToElement(l("[id='antbits-bmi-calc_btn']"));
    await click(l("[id='antbits-bmi-calc_btn']"));
    await waitForText(l("Please_enter_the_following_informat"), "Please enter the following information:");
  });

  test("ethnic group can be picked", async () => {
    await scrollToElement(l("[id='antbits-bmi-ethnicity']"));
    await click(l("[id='antbits-bmi-ethnicity']"));
    await selectOption(l("[value='11']"));
  });
});
