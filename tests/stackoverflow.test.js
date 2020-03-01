'use strict';

const {
  go,
  click,
  waitForElement,
  waitForNoElement,
  waitForText,
  test,
  scrollToElement,
  l,
  Locator
} = require('testim');

Locator.set(require('./locators/locators.js'));


describe('main page', () => {
  beforeEach(async () => {
    await go('https://stackoverflow.com/');
  });

  test('questions accessible from main page', async () => {
    await click(l('For_developers'));
    await click(l('Browse_questions'));
    await waitForElement(l('All_Questions'));
  });

  test('directly scrolling and clicking works', async () => {
    await scrollToElement(l('Browse_questions'));
    await click(l('Browse_questions'));
    await waitForElement(l('All_Questions'));
  });
})

describe('navigation menu toggles', () => {
  beforeEach(async () => {
    await go('https://stackoverflow.com/');
  });

  test('menu shows up properly', async () => {
    await click(l('.left-sidebar-toggle'));
    await waitForElement(l('Home_PUBLIC_Stack_Overflow_Tags_Use'));
  });

  test('menu closes properly', async () => {
    // open menu
    await click(l('.left-sidebar-toggle'));
    await waitForElement(l('Home_PUBLIC_Stack_Overflow_Tags_Use'));
    // close menu
    await click(l('.left-sidebar-toggle'));
    await waitForNoElement(l('Home_PUBLIC_Stack_Overflow_Tags_Use'));
  });
});

describe('navigation menu items', () => {
  beforeEach(async () => {
    await go('https://stackoverflow.com/');
    await click(l('.left-sidebar-toggle'));
    await waitForElement(l('Home_PUBLIC_Stack_Overflow_Tags_Use'));
  });

  test('access all questions from menu', async () => {
    await click(l('Stack_Overflow'));
    await waitForText(l('All_Questions'), 'All Questions');
  });

  test('access tags from menu', async () => {
    await click(l('Tags'));
    await waitForText(l('.fs-headline1'), 'Tags');
  });

  test('access users from menu', async () => {
    await click(l('Users'));
    await waitForText(l('.fs-headline1'), 'Users');
  });

  test('access jobs from menu', async () => {
    await click(l('Jobs'));
    await waitForText(l("[id='TabJobs']"), 'Jobs');
  });
});
