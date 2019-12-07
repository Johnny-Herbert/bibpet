import { defineSupportCode } from 'cucumber';
import { browser, $, element, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Given I am at some Login page not logged$/, async () => {
        await browser.get("http://localhost:4200/login");
        await expect(browser.getTitle()).to.eventually.equal('BibPET');
    });

    Given(/^Given I am at some "([^\"]*)" page not logged$/, async (bookTitle) => {
        await browser.get("http://localhost:4200/book");
        await expect(browser.getTitle()).to.eventually.equal(bookTitle);
    });

    When(/^When I check "([^\"]*)" option$/,  async (optionChecked) => {
        await element(by.buttonText(optionChecked)).click();
    });

    Then(/^The “Book status” is now “emprestado” by "([^\"]*)"$/, (bookStatus, bookActualOwner) => {
        await expect(browser.getText().to.eventually.equal(bookStatus));
        await expect(browser.getText().to.eventually.equal(bookActualOwner));
    });

    Then(/^The “Book status” is now “no prazo”$/, async (bookStatus) => {
        await expect(browser.getText().to.eventually.equal(bookStatus));
    });

    Then(/^I am at System Management page$/, async () => {
        await request.get("http://localhost:4200/admin").then(body => expect(body.includes('System Management').to.equal(true)));
    });

    Then(/^I am at Home page$/, async () => {
        await expect(browser.getTitle()).to.eventually.equal('Homepage');
    });

    When(/^When I fill login as "([^\"]*)" and password "([^\"]*)"$/, async (userLogin, userPassword) => {
        await $("input[name='userLogin']").sendKeys(userLogin);
        await $("input[name='userPassword']").sendKeys(userPassword);
        await element(by.buttonText('Entrar')).click();
    });
});
