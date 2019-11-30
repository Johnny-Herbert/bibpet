import { Book } from "./common/Book";
import { User } from "./common/User";
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
//Funções
let pAND = ((p,q,r,s) => p.then(a => q.then(b => r.then(c => s.then(d => a && b && c & d)))));
let sameName = ((elem, name) => elem.element(by.name('reserve-book-name-list')).getText().then(text => text === name));
let sameStartDate = ((elem, startDate) => elem.element(by.name('reserve-date-start-list')).getText().then(text => text === startDate));
let sameEndDate = ((elem, endDate) => elem.element(by.name('reserve-date-end-list')).getText().then(text => text === endDate));
let activeCondition = ((elem) => elem.element(by.name('reserve-condition-list')).getText().then(text => text === 'active'))
//Constantes
const login = async (email : string, password : string) => {
    await expect(browser.getTitle()).to.eventually.equal('Página Login');
    await $("input[name='email-box']").sendKeys(<string> email);
    await $("input[name='password-box']").sendKeys(<string> password);
    await element(by.name('login-button')).click();
}
const newUser = async(name: string, password: string, email: string) => {
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Usuário');
    await $("input[name='user-name-box']").sendKeys(<string> name);
    await $("input[name='user-password-box']").sendKeys(<string> password);
    await $("input[name='user-email.box']").sendKeys(<string> email);
    await element(by.name('button-finish-user-register')).click();
}
const newBook = async(name: string,type: string,isbn: string,author: string,edition: string) => {
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Livro');
    await $("input[name='book-name-box']").sendKeys(<string> name);
    await $("input[name='book-isbn-box']").sendKeys(<string> isbn);
    await $("input[name='book-author-box']").sendKeys(<string> author);
    await $("input[name='book-type-box']").sendKeys(<string> type);
    await $("input[name='book-edition-box']").sendKeys(<string> edition);
    await element(by.name('button-finish-book-register')).click();
}
const reserveBook = async(startDate: string,endDate: string) => {
    await expect(browser.getTitle()).to.eventually.equal('Página Fazer Reserva');
    await $("input[name='reservation-start-date']").sendKeys(<string> startDate);
    await $("input[name='reservation-end-date']").sendKeys(<string> endDate);
    await element(by.name('button-finish-reserve-register')).click();
}
//Testes
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^O petiano "([^\"]*)", com a senha "([^\"]*)" e email "([^\"]*)" esta logado no sistema.$/,
    async(name: string,password: string,email: string) => {  
        await browser.get("http://localhost:4200/");
        await login("pet@cin.ufpe.br","123");
        await element(by.name("user-register-button")).click();
        //Qual a pagina inicial?
        await newUser(<string>name, <string>password, <string>email);
        await element(by.name("logout-button")).click();
        await login(email,password);
    });
    Given(/^O livro “([^\"]*)” esta catalogado, seu tema e “([^\"]*)”, seu isbn e "([^\"]*)", seu autor e "([^\"]*)", sua edicao e "([^\"]*)"$/,
    async(name: string,type: string,isbn: string,author: string,edition: string) => {
        await element(by.name("my-books-button")).click();
        await expect(browser.getTitle()).to.eventually.equal('Página Meus Livros');
        await element(by.name("book-register-button")).click();
        await newBook(name,type,isbn,author,edition);
    });
    Given(/^Estou na página “([^\"]*)”.$/, async(pageName) => {
        await element(by.name("collection-button")).click();
        await expect(browser.getTitle()).to.eventually.equal(pageName);
    });
    Given(/^Não há nenhuma reserva no sistema para o livro “([^\"]*)” de isbn “([^\"]*)” no intervalo de “([^\"]*)” até “([^\"]*)”.$/,
    async(name,isbn,startDate,endDate) => {
        //
    });
    When(/^Eu solicito a reserva do livro “([^\"]*)” no intervalo de “([^\"]*)” até “([^\"]*)”.$/,
    async(name: string,startDate: string,endDate: string) => {
        await $("input[name='book-name-box']").sendKeys(<string> name);
        await element(by.name("book-name-box")).click();
        var books : ElementArrayFinder = element.all(by.name('book-list'));
        await books.filter(elem => sameName(elem, name).then
        (elems => expect(element(by.name('reserve-book-button')).click())));
        await reserveBook(startDate,endDate);
    });
    Then(/^Eu recebo uma mensagem de confirmação de reserva.$/,async() => {
        //
    });
    Then(/^Há uma  reserva no sistema para o livro “([^\"]*)” no intervalo de “([^\"]*)” até “([^\"]*)” em nome de “([^\"]*)”.$/,
        async(bookName: string,startDate: string,endDate: string,userName: string) => {
            await element(by.name('button-finish-reserve-register')).click();
            await expect(browser.getTitle()).to.eventually.equal('Página Reservas');
            var reserves: ElementArrayFinder = element.all(by.name(''))
            await reserves.filter(elem => pAND(sameName(elem, name), sameStartDate(elem, startDate), sameEndDate(elem, endDate), activeCondition(elem))).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
        });
});
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^O petiano "([^\"]*)", com a senha "([^\"]*)" e email "([^\"]*)" esta logado no sistema.$/,
    async(name: string,password: string,email: string) => {  
        await browser.get("http://localhost:4200/");
        await login("pet@cin.ufpe.br","123");
        await element(by.name("user-register-button")).click();
        //Qual a pagina inicial?
        await newUser(<string>name, <string>password, <string>email);
        await element(by.name("logout-button")).click();
        await login(email,password);
    });
    Given(/^Há uma  reserva no sistema para o livro “([^\"]*)” no intervalo de “([^\"]*)” até “([^\"]*)” em nome de “([^\"]*)”.$/,
        async(bookName: string,startDate: string,endDate: string,userName: string) => {
            await element(by.name('button-finish-reserve-register')).click();
            await expect(browser.getTitle()).to.eventually.equal('Página Reservas');
            var reserves: ElementArrayFinder = element.all(by.name(''))
            await reserves.filter(elem => pAND(sameName(elem, name), sameStartDate(elem, startDate), sameEndDate(elem, endDate), activeCondition(elem))).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    Given(/^Estou na página “([^\"]*)”.$/, async(pageName) => {
        await element(by.name("collection-button")).click();
        await expect(browser.getTitle()).to.eventually.equal(pageName);
    });
});