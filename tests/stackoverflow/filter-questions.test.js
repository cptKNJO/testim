'use strict';

const expect = require('chai').expect;
const {
  evaluate,
  exists,
  go,
  click,
  checkbox,
  test,
  text,
  l,
  Locator,
  radio,
  scrollToElement,
  type,
  waitForElement,
  waitForText
} = require('testim');

Locator.set(require('./locators/locators.js'));

describe('tabbed filter', () => {
  beforeEach(async () => {
    await go('https://stackoverflow.com/questions');
  });

  test('check proper title shown', async () => {
    await waitForText('h1', 'All Questions');
  });

  test('newest is selected by default', async () => {
    const selected = await evaluate(() => {
      return document
        .querySelector('.is-selected')
        .getAttribute('data-nav-value');
    });
    expect(selected).to.equal('Newest');
  });

  test('bountied shows only bounty questions', async () => {
    await go('https://stackoverflow.com/questions');
    await click(l('Bountied_423'));
    await waitForElement('.bounty-indicator');

    const allBountyQuestions = await evaluate(() => {
      const questions = [
        ...document.querySelectorAll('.question-summary .summary')
      ];
      return questions.every(element =>
        element.firstElementChild.classList.contains('bounty-indicator')
      );
    });

    expect(allBountyQuestions).to.equal(true);
  }); // end of test

  test('clicking more shows frequent and votes options', async () => {
    await click(l('More'));
    await waitForElement(l('Frequent'));
    await waitForElement(l('Votes'));
  });

  test('related tags take you to related questions', async () => {
    await scrollToElement(l("show_questions_tagged_'javascript'"));
    await click(l("show_questions_tagged_'javascript'"));
    await waitForElement(l('Questions_tagged_[javascript]'));
  });
});

describe('advanced filter', () => {
  beforeEach(async () => {
    await go('https://stackoverflow.com/questions');
    await click(l('Filter'));
  });

  test('shows advanced options when clicked', async () => {
    await waitForElement(l('Filter_by'));
  });

  test('hide advanced options when cancelled', async () => {
    await click(l('Apply_filter_Cancel'));
    await waitForElement(l('Filter_by'), {
      checkVisibility: false
    });
  });

  test('filter by can be selected', async () => {
    await click(l('No_answers'));
    const isChecked = await checkbox(l('No_answers'));
    await click(l('Apply_filter'));
    expect(isChecked).to.equal(true);
  });

  test('filter by one option shows correct questions', async () => {
    await waitForElement(l('Filter_by'));
    await click(l('No_answers'));
    await click(l('Apply_filter'));

    const allUnansweredQuestions = await evaluate(() => {
      const questions = [
        ...document.querySelectorAll('.statscontainer .stats')
      ];
      return questions.every(element =>
        element.children[1].classList.contains('unanswered')
      );
    });

    expect(allUnansweredQuestions).to.equal(true);
  });

  test('filter by two options shows correct questions', async () => {
    await waitForElement(l('Filter_by'));
    await click(l('No_answers'));
    await click(l('Has_bounty'));
    await click(l('Apply_filter'));

    const allUnansweredQuestions = await evaluate(() => {
      const questions = [
        ...document.querySelectorAll('.statscontainer .stats')
      ];
      return questions.every(element =>
        element.children[1].classList.contains('unanswered')
      );
    });

    const allBountyQuestions = await evaluate(() => {
      const questions = [
        ...document.querySelectorAll('.question-summary .summary')
      ];
      return questions.every(element =>
        element.firstElementChild.classList.contains('bounty-indicator')
      );
    });

    expect(allUnansweredQuestions).to.equal(true);
    expect(allBountyQuestions).to.equal(true);
  });

  test('sorted by works', async () => {
    await waitForElement(l('Filter_by'));
    await click(l('Most_votes'));
    await click(l('Apply_filter'));
    const isChecked = await radio(l('Most_votes'));
    expect(isChecked).to.equal(true);
    // Newest unchecked
    const newestChecked = await radio(l('Newest'));
    expect(newestChecked).to.equal(false);
  });

  test('searching with tags works', async () => {
    await waitForElement(l('Filter_by'));
    await click(l('e.g._javascript_or_java'));
    await type(l('e.g._javascript_or_java'), 'headless');
    await click(l('headless_836'));
    await click(l('Apply_filter'));
    await waitForText('h1', 'Questions tagged [headless]');
  });

  test('multiple tags work', async () => {
    await waitForElement(l('Filter_by'));
    await type(l('e.g._javascript_or_java'), 'headless');
    await click(l('headless_835'));
    await type(l('e.g._javascript_or_java'), 'java');
    await click(l('headless_835'));
    await click(l('Apply_filter'));

    const tags = await text(l('Tagged_with_headless_java'));
    expect(tags).to.have.string('Tagged with headless java');
  });

  test('incorrect tag shows no results found', async () => {
    await waitForElement(l('Filter_by'));
    await click(l('e.g._javascript_or_java'));
    await type(l('e.g._javascript_or_java'), 'lkmx');
    await click(l('Apply_filter'));
    await waitForText('h1', 'Questions tagged [lkmx]');
    const questions = await exists('.question-summary');
    expect(questions).to.equal(false);
  });

  test('removing tags works', async () => {
    await waitForElement(l('Filter_by'));
    await click(l('e.g._javascript_or_java'));
    await type(l('e.g._javascript_or_java'), 'headless');
    await click(l('headless_835'));
    await click(l('Remove_tag'));
    await waitForText(l('e.g._javascript_or_java'), '');
  });
});
