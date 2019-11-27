import { Book } from "./common/Book";
import { User } from "./common/User";
import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
let pAND = ((p,q,r) => p.then(a => q.then(b => r.then(c => a && b & c))));

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
    })
    Given(/^O livro “([^\"]*)” esta catalogado, seu tema e “([^\"]*)”, seu isbn e "([^\"]*)", seu autor e "([^\"]*)", sua edicao e "([^\"]*)"$/,
    async(name: string,type: string,isbn: string,author: string,edition: string) => {
        await element(by.name("my-books-button")).click();
        await expect(browser.getTitle()).to.eventually.equal('Página Meus Livros');
        await element(by.name("book-register-button")).click();
        await newBook(name,type,isbn,author,edition);
    })
    Given(/^Estou na página “([^\"]*)”.$/, async(pageName) => {
        await element(by.name("collection-button")).click();
        await expect(browser.getTitle()).to.eventually.equal('Página Acervo de Livros');
    })
    Given(/^Não há nenhuma reserva no sistema para o livro “([^\"]*)” de isbn “([^\"]*)” no intervalo de “([^\"]*)” até “([^\"]*)”.$/,
    async(name,isbn,startDate,endDate) => {
        //
    })
    Given(/^Eu solicito a reserva do livro “([^\"]*)” no intervalo de “([^\"]*)” até “([^\"]*)”.$/,
    async(bookName: string,isbn: string,startDate: string,endDate: string) => {
        await $("input[name='book-name-box']").sendKeys(<string> name);
        await element(by.name("book-name-box")).click();
        var books: ElementArrayFinder = element.all(by.name('book-list'));
        //
    })
});