import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, Button } from 'protractor';
import { async } from 'q';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
                                                    // let english
let sameData = ((elem, data) => elem.element(by.name('data-reservas')).getText().then(text => text === data));
let sameName = ((elem, name) => elem.element(by.name('nome-reservas')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

const userRegister = async(name : string, email : string, password : string ) => {
    await element(by.name('user-register-button')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Usuário');
    await $("input[name='user-name-box']").sendKeys(<string> name);
    await $("input[name='user-email-box']").sendKeys(<string> email);
    await $("input[name='user-password-box']").sendKeys(<string> password);
    await element(by.name('button-finish-user-register')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Usuário');
}

const bookRegister = async(name : string, isbn : string, edition : string, author : string , type : string) => {
    await element(by.name('book-register-button')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Livro');
    await $("input[name='book-name-box']").sendKeys(<string> name);
    await $("input[name='book-isbn-box']").sendKeys(<string> isbn);
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
    await expect(browser.getTitle()).to.eventually.equal('Página Acervo Livros');

}

const reserve = async ( initialDate : string, finalData : string) => {
    
    await expect(browser.getTitle()).to.eventually.equal('Página Reservas');
    await $("input[name='reservation-start-date']").sendKeys(<string> initialDate);
    await $("input[name='reservation-end-date']").sendKeys(<string> finalData);
    await element(by.name('button-finish-reserve-register')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Acervo de Livros');

}
const logout = async () => {
    await element(by.name('out-button')).click();
}

defineSupportCode(function ({ Given, When, Then }) {

    Given (/^eu estou logado como administrador do sistema.$/, async () => {
        await browser.get("http://localhost:4200/");
        await login("pet@pet.ufpe.br", "123");
        
    })

    Given(/^o livro "([^\"]*)", de ISBN "([^\"]*)", da edição "([^\"]*)", do autor "([^\"]*)" e tópico "([^\"]*)" está presente no acervo de livros$/, async (name, isbn, edition, author, type) => {
       
        await element(by.name('collection-button')).click();
        await expect(browser.getTitle()).to.eventually.equal('Página Acervo de Livros'); 
        await bookRegister(<string> name, <string> isbn, <string> edition, <string> author, <string> type);
        await registerCheck("book-name-list", <string> name, 1);
        await expect(browser.getTitle()).to.eventually.equal('Página Acervo de Livros');
        
    })

    Given(/^o petiano "([^\"]*)" com email "([^\"]*)" está cadastrado no sistema com a senha "([^\"]*)"$/, async (name, email, password) => {
        
        await element(by.name('user-register-button')).click();
        await expect(browser.getTitle()).to.eventually.equal('Página Alunos');
        await userRegister(<string> name, <string> email, <string> password);
        await registerCheck("user-list", <string> email, 1);

        await logout(); //Sai do admin

    })

    Given(/^o petiano com email "([^\"]*)" e senha "([^\"]*)" pegou o livro "([^\"]*)" na data "([^\"]*)" até "([^\"]*)"$/, async (email, password, livro, initialDate, finalDate) => {
        await login(<string> email, <string> password);
        await $("input[name='search-book-name']").sendKeys(<string> livro);
        await element(by.name('search-button')).click();
        await element(by.name('reserve-button-list')).click();
        await reserve(<string> initialDate, <string> finalDate);
        
        await logout(); //reserva o livro e desloga

    })

    When(/^eu seleciono a opção que me encaminha para a Página Acervo$/, async () => {
        await login("pet@pet.ufpe.br", "123");
    })

    When(/^eu seleciono a opção que me encaminha para os detalhes do livro "([^\"]*)" $/, async (livro) => {
        await $("input[name='book-name-box']").sendKeys(<string> livro);
        await element(by.name('button_reservas')).click();
        await expect(browser.getTitle()).to.eventually.equal('Página de Histórico de Reservas');
        
    })

    When(/^eu coloco a data inicial "([^\"]*)" e a data final "([^\"]*)" $/, async (dataInicial, dataFinal) => {
       
        await $("input[name='data-inicial']").sendKeys(<string> dataInicial);
        await $("input[name='data-final']").sendKeys(<string> dataFinal);
    
    })

    Then(/^eu consigo visualizar que o aluno "([^\"]*)" está na uma lista dos alunos que pegaram esse livro entre essas datas, na data "([^\"]*)"$/, async (nome, data) => {
       
        let allReservas : ElementArrayFinder = element.all(by.name('list-reservas'));
        let sameReserva = allReservas.filter(elem =>
                                      elem.getText().then(pAND(sameName(elem,nome),sameData(elem,data))));
        await sameReserva.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
     })
})