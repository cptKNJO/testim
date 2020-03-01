'use strict';

const expect = require('chai').expect;
const {
  go,
  evaluate,
  dragAndDrop,
  exists,
  test,
  text,
  l,
  Locator
} = require('testim');

Locator.set(require('./locators/locators.js'));

describe('drag and drop', () => {
  beforeEach(async () => {
    await go(
      'https://mdn.github.io/dom-examples/drag-and-drop/copy-move-DataTransfer.html'
    );
  });

  test('correct title', async () => {
    const title = await text('h1');
    expect(title).to.equal(
      'Drag and Drop: Copy and Move elements with DataTransfer'
    );
  });

  test('copying items works', async () => {
    await dragAndDrop('#src_copy', l("[id='dest_copy']"));
    const itemDragged = await exists(l("[id='newId']"));
    expect(itemDragged).to.equal(true);
  });

  test('copying items to move zone does not work', async () => {
    await dragAndDrop('#src_copy', l("[id='dest_move']"));
    const itemDragged = await exists(l("[id='newId']"));
    expect(itemDragged).to.equal(false);
  });

  test('moving items works', async () => {
    await dragAndDrop('#src_move', l("[id='dest_move']"));
    const childId = await evaluate(
      destination =>
        document.querySelector(destination).children[1].getAttribute('id'),
      '#dest_move'
    );
    expect(childId).to.equal('src_move');
  });

  test('moving items to copy zone does not work', async () => {
    await dragAndDrop('#src_move', l("[id='dest_copy']"));
    const childId = await evaluate(
      destination => document.querySelector(destination).children[1],
      '#dest_move'
    );
    expect(childId).to.be.undefined;
  });
});
