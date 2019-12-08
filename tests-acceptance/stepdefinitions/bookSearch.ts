import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import { when } from 'q';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameName = ((elem, name) => elem.element(by.name('book-name-list')).getText().then(text => text === name));
let sameAuthor = ((elem, author) => elem.element(by.name('book-author-list')).getText().then(text => text === author));
let sameType = ((elem, type) => elem.element(by.name('book-type-list')).getText().then(text => text === type));

let pAND = ((p,q,r) => p.then(a => q.then(b => r.then(c => a && b & c))));

const userRegister = async(name : string, email : string, password : string ) => {
    await element(by.name('user-register-button')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Usuário');
    await $("input[name='user-name-box']").sendKeys(<string> name);
    await $("input[name='user-email-box']").sendKeys(<string> email);
    await $("input[name='user-password-box']").sendKeys(<string> password);
    await element(by.name('button-finish-user-register')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Usuário');
}

const bookRegister = async(name : string, isbn: string, author : string, edition: string, type : string) => {
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Livro');
    await $("input[name='book-name-box']").sendKeys(<string> name);
    await $("input[name='booke-isbn-box']").sendKeys(<string> isbn)
    await $("input[name='book-author-box']").sendKeys(<string> author);
    await $("input[name='book-edition-box']").sendKeys(<string> edition);
    await $("input[name='book-type-box']").sendKeys(<string> type);
    await element(by.name('button-finish-book-register')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Livro');
}

const registerCheck = async (listName : string, id : string, listSize : number) => {
    let allRegistered : ElementArrayFinder = element.all(by.name(listName));
    let sameRegistered = allRegistered.filter(elem =>
                                  elem.getText().then(text => text === id));
    await sameRegistered.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(listSize));

}

const login = async (email : string, password : string) => {
    await expect(browser.getTitle()).to.eventually.equal('Página Login');
    await $("input[name='email-box']").sendKeys(<string> email);
    await $("input[name='password-box']").sendKeys(<string> password);
    await element(by.name('login-button')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Inicial');
}

const logout = async () => {
    await element(by.name('logout-button')).click();
}

const searchBook = async (bookName : string, bookAuthor : string, bookType : string) => {
    await $("input[name='search-book-name']").sendKeys(<string> bookName);
    await $("input[name='search-book-author']").sendKeys(<string> bookAuthor);
    await $("input[name='search-book-type']").sendKeys(<string> bookType);
    await element(by.name("search-button")).click();
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^O petiano "([^\"]*)" está logado no sistema com o email "([^\"]*)" e a senha "([^\"]*)"$/, async (name, email, password) => {
        await browser.get("http://localhost:4200/");
        await login("pet@pet.ufpe.br","123");
        await userRegister(<string>name, <string>email, <string>password);
        await registerCheck("user-list", <string>email, 1);
        await logout();
        await login(<string>email, <string>password);
    });

    Given(/^está na tela página acervo de livros$/, async () => {
        await element(by.name("collection-button")).click();
        await expect.get(browser.getTitle()).to.eventually("Página Acervo de Livros");
    });

    Given(/^o livro de nome "([^\"]*)", de autor "([^\"]*)" e de tópico "([^\"]*)" está cadastrado no sistema$/, async (name, author, type) => {
        await element(by.name("my-books-button")).click();
        await expect(browser.getTitle()).to.eveopicontually.equal("Página Meus Livros");
        await element(by.name('book-register-button')).click();
        await bookRegister(<string>name, "isbn", <string>author, "3", <string>type);
    });

    Given(/^eu vejo o livro de nome "([^\"]*)", de autor "([^\"]*)" e de tópico "([^\"]*)" na lista de livros cadastrados$/, async (name, author, type) => {
        var books : ElementArrayFinder = element.all(by.name('book-list'));
        await books.filter(elem => pAND(sameName(elem, name), sameAuthor(elem, author), sameType(elem, type))).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    When(/^eu pesquiso pelo nome "([^\"]*)"$/, async (name) => {
        await searchBook(<string>name, "", "");
    });

    Then(/^eu vejo na lista de livros o livro de nome "([^\"]*)" de autor "([^\"]*)" e de tópico "([^\"]*)"$/, async (name, author, type) => {
        var livros : ElementArrayFinder = element.all(by.name('livro-list'));
        await livros.filter(elem => pAND(sameName(elem, name), sameAuthor(elem, author), sameType(elem, type))).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

})