const { expect } = require("chai");
const {
  exists,
  go,
  click,
  waitForElement,
  withContext,
  test,
  l,
  Locator,
} = require("testim");


Locator.set(require("./locators/locators"));

const url = "https://www.photopea.com/";

describe("elements present", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("title", async () => {
    await waitForElement(l("New_Project_Open_From_Computer_Demo"));
  });

  test("create a new project from template", async () => {
    await click(l("File"));
    await click(l("New_Project"));
    await click(l(".svggallery_>_:nth-child(3)_[y='132"));
  });

  test("right click displays layer-picking menu", async () => {
    await click(l("File"));
    await click(l("New..."));
    await click(l(".svggallery_>_:nth-child(1)_[id='Ba"));

    let menuVisible = await exists("div.enab");
    expect(menuVisible).to.equal(false);

    await click(l("[width='964']"), { button: "right" });

    menuVisible = await exists("div.enab");
    expect(menuVisible).to.equal(true);
  });
});


describe("navigation", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("learn takes to tutorials", async () => {
    await click(l("Learn"));

    const tutorial = await withContext({
      tabUrl: "https://www.photopea.com/learn/",
    });
    await tutorial.waitForText("h1", "Introduction");
  });

  test("blog takes to blog", async () => {
    await click(l("Blog"));

    const blog = await withContext({
      tabUrl: "https://blog.photopea.com/",
    });
    await blog.waitForText(l(".curr"), "Blog");
  });

  test("api takes to api doc", async () => {
    await click(l("API"));

    const api = await withContext({
      tabUrl: "https://www.photopea.com/api/",
    });

    await api.waitForText(l(".curr"), "API");
  });
});
