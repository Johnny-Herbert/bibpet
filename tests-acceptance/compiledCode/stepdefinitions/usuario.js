"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^Given I am at some Login page not logged$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('Login BibPET');
    }));
    Given(/^Given I am at some "([^\"]*)" page not logged$/, (bookTitle) => __awaiter(this, void 0, void 0, function* () {
        var urlAtual = "http://localhost:4200/" + bookTitle;
        yield protractor_1.browser.get(urlAtual);
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal(bookTitle);
    }));
    When(/^When I check “Peguei o livro” option$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Peguei o livro')).click();
    }));
    When(/^When I check “Devolveer o livro” option$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('Devolver o livro')).click();
    }));
    Then(/^The “Book status” is now “emprestado” by "([^\"]*)"$/, (bookStatus, bookActualOwner) => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.browser.getText().to.eventually.equal(bookStatus));
        yield expect(protractor_1.browser.getText().to.eventually.equal(bookActualOwner));
    }));
    Then(/^The “Book status” is now “no prazo”$/, (bookStatus) => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.browser.getText().to.eventually.equal(bookStatus));
    }));
    Then(/^I am at System Management page$/, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('System Management');
    }));
    Then(/^I am at Home page$/, () => __awaiter(this, void 0, void 0, function* () {
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('Home');
    }));
    When(/^When I fill login as "([^\"]*)" and password "([^\"]*)"$/, (userLogin, userPassword) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='userLogin']").sendKeys(userLogin);
        yield protractor_1.$("input[name='userPassword']").sendKeys(userPassword);
        yield protractor_1.element(protractor_1.by.buttonText('Entrar')).click();
    }));
});
