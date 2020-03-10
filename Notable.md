---
tags: [Notebooks/Fiverr/Testim]
title: Notable
created: '2020-02-29T09:47:53.355Z'
modified: '2020-03-10T10:28:00.533Z'
---

# Notable

## Documentation

- https://help.testim.io/docs/what-about-page-objects: change the Github link to examples to https://github.com/testimio/TDK-kitchensink
- https://help.testim.io/docs/api: the **Working with environment variables** link does not work because of typo in the word "environment"
- https://help.testim.io/docs/wait-for-code: written twice as an example // ✅ poll a JavaScript variable
  await waitForCode(() => window.isTestReady);

## API

- resize() keeps flickering if dimensions beyond that of device
- remove unused locators from folder after new ones are imported
- scrollToPosition expects x's position to be a number not object - even when object given
- submit(form) does not work in a lot of cases; clicking on submit button to submit most forms
