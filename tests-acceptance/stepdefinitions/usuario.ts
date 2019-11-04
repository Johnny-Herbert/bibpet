import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Given I am at some Login page not logged$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Login BibPET');
    })

    Given(/^Given I am at some "([^\"]*)" page not logged$/, async (bookTitle) => {
        var urlAtual = "http://localhost:4200/" + bookTitle;
        await browser.get(urlAtual);
        await expect(browser.getTitle()).to.eventually.equal(bookTitle);
    })

    When(/^When I check “Peguei o livro” option$/, async () => {
        await element(by.buttonText('Peguei o livro')).click();
    });

    When(/^When I check “Devolveer o livro” option$/, async () => {
        await element(by.buttonText('Devolver o livro')).click();
    });

    Then(/^The “Book status” is now “emprestado” by "([^\"]*)"$/, async (bookStatus, bookActualOwner) => {
        await expect(browser.getText().to.eventually.equal(bookStatus));
        await expect(browser.getText().to.eventually.equal(bookActualOwner));
    })

    Then(/^The “Book status” is now “no prazo”$/, async (bookStatus) => {
        await expect(browser.getText().to.eventually.equal(bookStatus));
    })

    Then(/^I am at System Management page$/, async () => {
        await expect(browser.getTitle()).to.eventually.equal('System Management');
    })

    Then(/^I am at Home page$/, async () => {
        await expect(browser.getTitle()).to.eventually.equal('Home');
    })

    When(/^When I fill login as "([^\"]*)" and password "([^\"]*)"$/, async (userLogin, userPassword) => {
        await $("input[name='userLogin']").sendKeys(<string> userLogin);
        await $("input[name='userPassword']").sendKeys(<string> userPassword);
        await element(by.buttonText('Entrar')).click();
    });
})
