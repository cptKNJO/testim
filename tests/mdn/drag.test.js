
const { expect } = require("chai");
const {
  exists,
  go,
  waitForText,
  withContext,
  scrollToElement,
  test,
} = require("testim");

const url = "https://developer.mozilla.org/en-US/docs/Web/API/Document/drag_event";

describe("iframe page loads component", () => {
  beforeEach(async () => {
    await go(url);
  });

  test("check title", async () => {
    await waitForText("h1", "Document: drag event");
  });

  test("draggable iframe loads", async () => {
    const iframe = await exists(".live-sample-frame");
    expect(iframe).to.equal(true);
  });

  test("draggable item present", async () => {
    const dragFrame = withContext({
      frameSelector: ".live-sample-frame",
      tabUrl: "*developer.mozilla.org*",
      tabIndex: 0,
    });
    await dragFrame.waitForElement(".dropzone #draggable");
  });

  test("item is draggable", async () => {
    await scrollToElement(".live-sample-frame");

    const dragFrame = withContext({
      frameSelector: ".live-sample-frame",
      tabUrl: "*developer.mozilla.org*",
      tabIndex: 0,
    });
    await dragFrame.waitForElement(".dropzone #draggable");
    const
      itemX = 30;

    const
      itemY = 10;
    await dragFrame.drag("#draggable", [{ x: itemX, y: itemY }, { x: itemX + 30, y: itemY + 30 }]);
  });
});
