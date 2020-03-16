"use strict";

const expect = require("chai").expect;
const {
  evaluate,
  exists,
  go,
  hover,
  click,
  waitForCode,
  waitForElement,
  waitForNoElement,
  waitForText,
  scrollToElement,
  test,
  text,
  type,
  l,
  Locator
} = require("testim");

Locator.set(require("./locators/locators.js"));

describe("basic elements", () => {
  beforeEach(async () => {
    await go("https://demo.saleor.io/product/white-plimsolls/88/");
  });

  test("item takes user to product page", async () => {
    await waitForElement("h3");
    const product = await text("h3");
    expect(product).to.equal("White Plimsolls");
  });

  test("first picture shown in set by default", async () => {
    const imageSrc = await evaluate(() =>
      document
        .querySelector(
          "div.product-page__product__gallery > div > div:nth-child(2) img"
        )
        .getAttribute("src")
    );
    expect(imageSrc).to.have.string("sneakers_02_1.png");
  });

  test("different pictures displayed on hover", async () => {
    let imageSrc = await evaluate(() =>
      document
        .querySelector(
          "div.product-page__product__gallery > div > div:nth-child(2) img"
        )
        .getAttribute("src")
    );
    expect(imageSrc).to.have.string("sneakers_02_1.png");
    await hover("div.product-page__product__gallery ul li:nth-child(2) img");
    imageSrc = await evaluate(() =>
      document
        .querySelector(
          "div.product-page__product__gallery > div > div:nth-child(2) img"
        )
        .getAttribute("src")
    );
    expect(imageSrc).to.have.string("sneakers_02_2.png");
  });

  test("proper pagination", async () => {
    await waitForText(
      l("Home_Footwear_White_Plimsolls"),
      "HomeFootwearWhite Plimsolls"
    );
  });

  test("original price shown after selecting variant", async () => {
    await waitForText(l("$44.10"), "$44.10");
    await click(l(".product-description__variant-picke"));
    await click(l("40"));
    await waitForText(l("$49.00"), "$49.00");
  });
});

describe("adding product to basket", () => {
  beforeEach(async () => {
    await go("https://demo.saleor.io/product/white-plimsolls/88/");
  });

  test("cannot add to basket without selecting variant", async () => {
    await waitForElement("button");
    await waitForCode(() =>
      document
        .querySelector("div.product-page__product__info button")
        .hasAttribute("disabled")
    );

    await click(l(".product-description__variant-picke"));
    await click(l("41"));

    const disabled = await evaluate(() =>
      document
        .querySelector("div.product-page__product__info button")
        .hasAttribute("disabled")
    );
    expect(disabled).to.equal(false);
  });

  test("only item in stock can be added to basket", async () => {
    await click(l(".product-description__variant-picke"));
    await click(l("40"));

    await waitForCode(() =>
      document
        .querySelector("div.product-page__product__info button")
        .hasAttribute("disabled")
    );

    await click(l(".product-description__variant-picke"));
    await click(l("41"));
    const disabled = await evaluate(() =>
      document
        .querySelector("div.product-page__product__info button")
        .hasAttribute("disabled")
    );
    expect(disabled).to.equal(false);
  });

  test("selecting variant opens up sidebar", async () => {
    await click(l(".product-description__variant-picke"));
    await waitForElement(l("PLEASE_SELECT_SHOE_SIZE"));
  });

  test("variant sidebar can be closed", async () => {
    await click(l(".product-description__variant-picke"));

    let sidebarVisible = await exists(l("PLEASE_SELECT_SHOE_SIZE"));
    expect(sidebarVisible).to.equal(true);

    await click(l(".sc-gqjmRU"));
    sidebarVisible = await exists(l("PLEASE_SELECT_SHOE_SIZE"));
    expect(sidebarVisible).to.equal(false);
  });

  test("cannot add to wishlist without logging in", async () => {
    await click(l("ADD_TO_WISHLIST"));
    await waitForElement(l("PLEASE_LOG_IN_TO_ADD_THE_PRODUCT_TO"));
  });

  test("quantity can only be 1 and above", async () => {
    await type(l("[type='number']"), "");
    let quantity = await text(l("[type='number']"));
    expect(quantity).to.equal("1");
    await type(l("[type='number']"), "1");
    quantity = await text(l("[type='number']"));
    expect(quantity).to.equal("11");
  });
});

describe("related products", () => {
  beforeEach(async () => {
    await go("https://demo.saleor.io/product/white-plimsolls/88/");
  });

  test("related products also include current item", async () => {
    await scrollToElement(l(".sc-iSDuPN_>_:nth-child(2)_.sc-bAeI"));
    await waitForText(l("WHITE_PLIMSOLLS"), "White Plimsolls");
  });

  test("selecting other items from related items works", async () => {
    await scrollToElement(l(".sc-iSDuPN_>_:nth-child(2)_.sc-bAeI"));
    await click(l(".sc-iSDuPN_>_:nth-child(2)_.sc-bAeI"));
    await waitForElement("h3");
    const product = await text("h3");
    expect(product).to.equal("Yellow Plimsolls");
  });
});

describe("single product cart", () => {
  beforeEach(async () => {
    await go("https://demo.saleor.io/product/white-plimsolls/88/");
  });

  test("cart can be openend from product page", async () => {
    await click(l("[data-src='/images/cart.svg']"));
    await waitForElement(l("MY_BAG,_0_ITEMS"));
  });

  test("cart can be closed from product page", async () => {
    await click(l("[data-src='/images/cart.svg']"));
    await waitForElement(l("MY_BAG,_0_ITEMS"));
    await click(l("[data-src='/images/x.svg']"));
    await waitForNoElement(l("MY_BAG,_0_ITEMS"));
  });

  test("added to cart successfully", async () => {
    await click(l(".product-description__variant-picke"));
    await click(l("41"));
    await click(l("ADD_TO_BASKET"));
    await click(l("[data-src='/images/cart.svg']"));
    await waitForText(l("SUBTOTAL_$44.10"), "Subtotal$44.10");
  });

  test("remove from cart successfully", async () => {
    await click(l(".product-description__variant-picke"));
    await click(l("41"));
    await click(l("ADD_TO_BASKET"));
    await click(l("[data-src='/images/cart.svg']"));
    await waitForText(l("SUBTOTAL_$44.10"), "Subtotal$44.10");
    await click(l(".cart__list__item__details__delete-"));
    await waitForElement(l("0_ITEMS"));
  });
});
