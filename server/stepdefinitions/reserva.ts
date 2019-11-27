import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

/*
Deve funcionar para os seguintes scenarios:
 
Scenario: Tela de Login verifica se é usuário ou administrador
Given I am at some "Login" page not logged
When I fill login as "PET-Admin" and password "admin"
And I see a warning telling that I’m now logged as "System Admin"
Then I am at "System Management" page

Scenario: Tela de Login verifica se é usuário ou administrador
Given I am at some "Login" page not logged
When I fill login as "vss2@pet.cin.ufpe.br" and password "012345689"
Then I am at "Home" page logged as "Vitor Sousa"

Scenario: Confirmar posse do livro na data prevista
Given I am at "Cracking the Code" page logged as "Vitor Sousa"
And I see the "Cracking the Code" details 
And The book status is "Disponível"
And I see a "Peguei o livro" option
When I check "Peguei o livro" option
Then The "Book status" is now "emprestado" by "Vitor Sousa"

Scenario: Confirmar devolução na data posterior
Given I am at "Cracking the Code" "Book" page logged as "Vitor Sousa"
And I see the "Cracking the Code" details 
And The book status is "emprestado"
And I see a "Devolver o livro" option
And The "Book devolution status" is "no prazo"
When I check "Devolver o livro" option
Then The "Book status" is now "disponível"
 */

defineSupportCode(function ({ Given, And, When, Then }) {
    Given(/^I am at the book devolution page$/, async () => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Devolucao de livro');
    })

    Given(/^I am at "(\d*)" page logged as "(\d*)"$/, async (book, user) => {
        await expect(browser.getTitle()).to.eventually.equal(book);                        // Vê se está na página do livro
        var pageContent = browser.findElement(by.name('userSession'));        // Encontra o usuário da sessão atual
        var user = pageContent.filter(elem => elem.getText().then(text => text === user)); // Vê se o usuário da sessão atual é o do teste
    });

    When(/^I check "([^\"]*)"$/, async (option) => {
        // https://www.protractortest.org/#/api?view=webdriver.WebElement.prototype.isSelected
        let checkbox = element(by.name('peguei_o_livro'));
        expect(checkbox.isSelected()).toBe(false));         // Tomara que esteja desmarcada
        checkbox.click();                                   // Clica na checkbox
        expect(checkbox.isSelected()).toBe(true));         // Tomara que esteja marcada
        let EC = protractor.ExpectedConditions;
        browser.wait(EC.elementToBeSelected($('#peguei_o_livro')), 5000);
        // https://www.protractortest.org/#/api?view=ProtractorExpectedConditions.prototype.elementToBeSelected
    });

    Given(/^I cannot see a student with CPF "(\d*)" in the students list$/, async (cpf) => {
        var allcpfs : ElementArrayFinder = element.all(by.name('cpflist'));
        var samecpfs = allcpfs.filter(elem =>
                                      elem.getText().then(text => text === cpf));
        await samecpfs.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(0));
    });

    When(/^I try to register the student "([^\"]*)" with CPF "(\d*)"$/, async (name, cpf) => {
        await $("input[name='namebox']").sendKeys(<string> name);
        await $("input[name='cpfbox']").sendKeys(<string> cpf);
        await element(by.buttonText('Adicionar')).click();
    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

    Then(/^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/, async (name, cpf) => {
        var allalunos : ElementArrayFinder = element.all(by.name('alunolist'));
        await allalunos.filter(elem => pAND(sameCPF(elem,cpf),sameName(elem,name))).then
                   (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

})
