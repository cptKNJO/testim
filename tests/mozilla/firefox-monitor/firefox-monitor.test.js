const {
  click,
  go,
  waitForElement,
  waitForText,
  scrollToElement,
  test,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators"));

const url = "https://monitor.firefox.com/";

describe("elements present", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("firefox monitor visible", async () => {
    await waitForElement(l(".fx-monitor-logotype"));
  });

  test("form for checking breaches shown", async () => {
    await waitForElement(l("Enter_Email_Address"));
  });

  test("latest breach added visible", async () => {
    await scrollToElement(l("LATEST_BREACH_ADDED"));
    await waitForElement(l("LATEST_BREACH_ADDED"));
  });

  test("sign up section visible", async () => {
    await scrollToElement(l("Sign_up_for_breach_monitoring_with_"));
    await waitForText(l("Sign_up_for_breach_monitoring_with_"), "Sign up for breach monitoring with a Firefox Account.");
  });
});

describe("navigation", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("breaches", async () => {
    await click(l("Breaches"));
    await waitForText(l("All_breaches_in_Firefox_Monitor"), "All breaches in Firefox Monitor");
  });

  test("security tips", async () => {
    await click(l("Security_Tips"));
    await waitForText(l("Security_tips_to_protect_yourself_f"), "Security tips to protect yourself from hackers");
  });

  test("firefox apps and services", async () => {
    await click(l("Firefox_apps_and_services"));
    await waitForElement(l("Firefox_is_tech_that_fights_for_you"));
  });

  test("sign in", async () => {
    await click(l("Sign_In"));
    await waitForText(l("Enter_your_email_to_continue_to_Fir"), "Enter your email to continue to Firefox Monitor");
  });
});
