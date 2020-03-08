'use strict';

// const expect = require('chai').expect;
const {
  go,
  click,
  waitForElement,
  waitForNoElement,
  waitForText,
  type,
  sendCharacter,
  test,
  l,
  Locator
} = require('testim');

Locator.set(require('./locators/locators.js'));

const url = 'https://www.w3schools.com/';

describe('main page', () => {
  beforeEach(async () => {
    await go(url);
  });
  // test('search bar shown', async () => {})
  // test('form can be submitted', async () => {})
  // test('search for available term', async () => {})
  // test('search for unavailable term', async () => {})
  // test('', async () => {})
});

describe('search form', () => {
  beforeEach(async () => {
    await go(url);
    await click(l('Search_W3Schools'));
  });

  test('search bar shown', async () => {
    await waitForElement(l('.gsib_a'));
  });

  test('search bar can be closed', async () => {
    await waitForElement(l('.gsib_a'));
    await click(l('Search_W3Schools'));
    await waitForNoElement(l('.gsib_a'));
  });

  test.only('search bar icon submits on click', async () => {
    await waitForElement(l('.gsib_a'));
    await type(l('Custom_Search'), 'slide');
    await click(l('.gsc-search-button-v2'));
    await waitForElement(l('About_1,520_results_(0.20_seconds)'));
  });

  test.only('search bar cleared on clicking "x"', async () => {
    await waitForElement(l('.gsib_a'));
    await type(l('Custom_Search'), 'slide');
    await click(l('.gscb_a'));
    await waitForText(l('.gsib_a'), '');
  });

  test('search can be performed', async () => {
    await waitForElement(l('.gsib_a'));
    await type(l('Custom_Search'), 'slide');
    await sendCharacter(l('Custom_Search'), '\r');
    await waitForElement(l('About_1,520_results_(0.20_seconds)'));
  });

  test('search for unavailable term', async () => {
    await waitForElement(l('.gsib_a'));
    await type(l('Custom_Search'), 'kjbsdvkasdbv');
    await sendCharacter(l('Custom_Search'), '\r');
    await waitForElement(l('No_Results'));
  });

  test('search results modal can be closed', async () => {
    await waitForElement(l('.gsib_a'));
    await type(l('Custom_Search'), 'slide');
    await sendCharacter(l('Custom_Search'), '\r');
    await waitForElement(l('About_1,520_results_(0.20_seconds)'));

    await click(l('.gsc-results-close-btn'));
    await waitForNoElement(l('About_1,520_results_(0.20_seconds)'));
  });
});
