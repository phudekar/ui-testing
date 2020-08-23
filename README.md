# Testing Single Page Applications

## Background:
There many ways to test the frontend of a web application. Most widely used has been to test application as a user would use using Selenium Webdriver or similar libraries. This meant that you have to write test for each and every scenario as a user workflow.

This made our very test slow and delayed the whole Test Driven Development cycle. That lead most UI developers to only write their code and let the UI Automation teams writing test for them.

It is not difficult to see then that dependency on multiple teams
delayed the feedback cycle. Thus delaying the continuous delivery process.

But today we are mainly going focus on testing Single Page Applications (SPA).

Modern SPA frameworks like React, Angular and Vue.js use component based approach to build UI by composing smaller components together. This provides us an opportunity to test our application logic at component level as well as the complete app as a black box.

Because of this granularity of modern SPA testing our testing pyramid would usually look like following:

![UI Testing Pyramid](https://raw.githubusercontent.com/phudekar/ui-testing/master/public/UI_Testing_Pyramid.png)

Lets look at each one of them from top to bottom.

### 1. Unit Tests:

These are your tests for plain old Javascript functions and classes that you are writing as part of the application. These may include any domain classes, functional utilities or more specifically the helper functions of the UI components. Because these tests usually don't depend on any other code or library you should be able to write test each and every use case of these functions. There are many framework available in Javascript to test this kind of Javascript objects. Most commonly used are [Jasmine](https://jasmine.github.io/), [Mocha](https://mochajs.org/) and [Jest](https://jestjs.io/).




