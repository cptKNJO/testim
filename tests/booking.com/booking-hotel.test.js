
const { expect } = require("chai");
const {
  go,
  click,
  dblclick,
  waitForElement,
  waitForText,
  sendCharacter,
  test,
  text,
  type,
  l,
  Locator,
} = require("testim");

Locator.set(require("./locators/locators.js"));

describe("searching", () => {
  beforeEach(async () => {
    await go("https://www.booking.com/");
    await waitForElement(l("Booking.com_Online_Hotel_Reservatio"));
  });

  test("search form present", async () => {
    await waitForElement("#frm");
  });

  test("search works", async () => {
    await type(l("Where_are_you_going?"), "Lon");
    await click(l("London_Greater_London,_United_Kingd"));
    await click(
      "#frm div.bui-calendar__content > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(3)",
    );
    await click(
      "#frm div.bui-calendar__content > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(5)",
    );
    await click(l("Search"));
    await waitForText(l("London"), "London");
  });

  test("search does not work for 30 days and above", async () => {
    await type(l("Where_are_you_going?"), "Lon");
    await click(l("London_Greater_London,_United_Kingd"));
    await click(
      "#frm div.bui-calendar__content > div:nth-child(1) > table > tbody > tr:nth-child(3) > td:nth-child(3)",
    );
    // plus 30 days
    await click(
      "#frm div.bui-calendar__content > div:nth-child(2) > table > tbody > tr:nth-child(3) > td:nth-child(3)",
    );
    await click(l("Search"));
    await waitForText(
      l("Reservations_longer_than_30_nights_"),
      "Reservations longer than 30 nights are not possible.",
    );
  });

  test("search does not work without destination", async () => {
    await type(l("Where_are_you_going?"), "");
    await sendCharacter(l("Where_are_you_going?"), "\r");
    await click(l("Search"));
    await waitForText(
      l("Error:_Enter_a_destination_to_start"),
      "Error: Enter a destination to start searching.",
    );
  });

  test("change adult number", async () => {
    await click(l("Rooms_and_occupancy_4_adults__0_chi"));
    await dblclick(l("+"));
    const adults = await text(l("4_adults"));
    expect(adults).to.equal("4 adults");
  });
});
