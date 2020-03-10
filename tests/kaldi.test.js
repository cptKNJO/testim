'use strict';

const expect = require('chai').expect;
const {
  click,
  go,
  resize,
  scrollToElement,
  sleep,
  test,
  text,
  type,
  waitForText,
  waitForElement,
  l,
  Locator
} = require('testim');

Locator.set(require('./locators/locators.js'));

describe('navigation', () => {
  beforeEach(async () => {
    await resize({ width: 1101, height: 919 });
    await go('https://gatsby-netlify-cms.netlify.com/');
  });

  test('main page', async () => {
    await waitForElement(l('Logo'));
    await waitForText(l('Why_Kaldi'), 'Why Kaldi');
  });

  test('about page', async () => {
    await click(l('About'));
    await waitForText(l('About_our_values'), 'About our values');
  });

  test('products', async () => {
    await click(l('Products'));
    await waitForText(l('Our_Coffee'), 'Our Coffee');
  });

  test('blog page', async () => {
    await click(l('Blog'));
    await waitForText(l('Latest_Stories'), 'Latest Stories');
  });

  test('single blog', async () => {
    await click(l('Blog'));
    await waitForText(l('Latest_Stories'), 'Latest Stories');

    await scrollToElement('div.is-parent:nth-child(3) a.title');
    await click('div.is-parent:nth-child(3) a.title');

    await waitForText('h1', 'Making sense of the SCAA’s new Flavor Wheel');
  });

  test.only('single blog with tags', async () => {
    await click(l('Blog'));
    await waitForText(l('Latest_Stories'), 'Latest Stories');

    await scrollToElement('div.is-parent:nth-child(3) a.title');
    await click('div.is-parent:nth-child(3) a.title');

    await waitForText('h1', 'Making sense of the SCAA’s new Flavor Wheel');
    await scrollToElement('.taglist');

    await waitForText('.taglist', 'flavortasting');
  });

  test('contact form gets submitted', async () => {
    await click(l('Contact'));
    await type(l('Your_name'), 'test');
    await type(l('Email'), 'test@testing.com');
    await type(l('Message'), 'Default Message');
    await click('button[type=submit]');
    await sleep(500);
    await waitForElement(l('Thank_you!'));
    const reply = await text(l('Thank_you!'));
    expect(reply).to.have.string('Thank you!');
  });

  test('form examples page', async () => {
    await click(l('Form_Examples'));
    await waitForText(l('Hi_people'), 'Hi people');
  });
});
