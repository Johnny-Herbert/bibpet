import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by, Button } from 'protractor';
import { async } from 'q';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let sameData = ((elem, data) => elem.element(by.name('data-reservas')).getText().then(text => text === data));
let sameName = ((elem, name) => elem.element(by.name('nome-reservas')).getText().then(text => text === name));

let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

const cadastrarAluno = async(nome : string, cpf : string, email : string, senha : string ) => {
    await element(by.name('button-cadastrar-aluno')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro');
    await $("input[name='nome-aluno-box']").sendKeys(<string> nome);
    await $("input[name='nome-aluno-cpf']").sendKeys(<string> cpf);
    await $("input[name='email-aluno-box']").sendKeys(<string> email);
    await $("input[name='senha-aluno-box']").sendKeys(<string> senha);
    await element(by.name('button-fim-cadastro-aluno')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Alunos');
}

const cadastrarLivro = async(nome : string, autor : string , topico : string) => {
    await element(by.name('button-cadastrar-livro')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro Livro');
    await $("input[name='nome-livro-box']").sendKeys(<string> nome);
    await $("input[name='autor-livro-box']").sendKeys(<string> autor);
    await $("input[name='topico-livro-box']").sendKeys(<string> topico);
    await element(by.name('button-fim-cadastro-livro')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Alunos');
}

const verificarCadastro = async (listname : string, identificador : string, tamanholist : number) => {
    let allCadastrados : ElementArrayFinder = element.all(by.name(listname));
    let sameCadastrado = allCadastrados.filter(elem =>
                                  elem.getText().then(text => text === identificador));
    await sameCadastrado.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(tamanholist));

}

const login = async (email : string, senha : string) => {
    await $("input[name='email-box']").sendKeys(<string> email);
    await $("input[name='senha-box']").sendKeys(<string> senha);
    await element(by.name('button-entrar')).click();

}

const reserva = async ( dataInicial : string, dataFinal : string) => {
    
    await expect(browser.getTitle()).to.eventually.equal('Página Reservas');
    await $("input[name='data-atual']").sendKeys(<string> dataInicial);
    await $("input[name='data-entrega']").sendKeys(<string> dataFinal);
    await element(by.name('button_finalizar-reserva')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Acervo');

}
const logout = async () => {
    await element(by.name('button-sair')).click();
}

defineSupportCode(function ({ Given, When, Then }) {

    Given (/^eu estou logado como administrador do sistema, na página principal.$/, async () => {

        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Página Login');
        await login("pet@pet.ufpe.br", "123");
        await expect(browser.getTitle()).to.eventually.equal('Home');
        
    })

    Given(/^o livro "([^\"]*)" do autor "([^\"]*)" e tópico "([^\"]*)" está presente no acervo de livros$/, async (livro, autor, topico) => {
       
        await element(by.name('button-acervo')).click();
        await expect(browser.getTitle()).to.eventually.equal('Página Acervo'); 
        await cadastrarLivro(<string> livro, <string> autor, <string> topico);
        await verificarCadastro("livro-list", <string> livro, 1);
        await element(by.name('button-voltar-pag-home')).click();

    })

    Given(/^o petiano(a) “([^\"]*)” de cpf "([^\"]*)” com email “([^\"]*)” está cadastrado(a) no sistema com a senha “([^\"]*)”$/, async (nome, cpf, email, senha) => {
        
        await element(by.name('button-alunos')).click();
        await expect(browser.getTitle()).to.eventually.equal('Página Alunos');
        await cadastrarAluno(<string> nome, <string> cpf, <string> email, <string> senha);
        await verificarCadastro("aluno-list", <string> cpf, 1);

        await logout();

    })


    Given(/^o petiano com email “([^\"]*)” e senha “([^\"]*)” pegou o livro “([^\"]*)”, na data “([^\"]*)” até “([^\"]*)”$/, async (email, senha, livro, dataInicial, dataFinal) => {
        
        await expect(browser.getTitle()).to.eventually.equal('Página Login');
        await login(<string> email, <string> senha);
        await expect(browser.getTitle()).to.eventually.equal('Home');
        await element(by.name('button_acervo')).click();

        await expect(browser.getTitle()).to.eventually.equal('Página Acervo');
        await $("input[name='pesquisa-nome-livro']").sendKeys(<string> livro);
        await element(by.name('button_reserva')).click();
        await reserva(<string> dataInicial, <string> dataFinal);
        
        await logout();

    })

    When(/^eu seleciono a opção que me encaminha para a Página Acervo.$/, async () => {
       
        await expect(browser.getTitle()).to.eventually.equal('Página Login');
        await login("pet@pet.ufpe.br", "123");
        await expect(browser.getTitle()).to.eventually.equal('Home');
        await element(by.name('button_acervo')).click();
        await expect(browser.getTitle()).to.eventually.equal('Página Acervo');
    })

    When(/^eu seleciono a opção que me encaminha para a Página do Histórico de Reservas do livro “([^\"]*)” $/, async (livro) => {
       
        await $("input[name='pesquisa-nome-livro']").sendKeys(<string> livro);
        await element(by.name('button_reservas')).click();
        await expect(browser.getTitle()).to.eventually.equal('Página do Histórico de Reservas');
        
    })

    When(/^eu coloco a data inicial “([^\"]*)” e a data final “([^\"]*)” $/, async (dataInicial, dataFinal) => {
       
        await $("input[name='data-inicial']").sendKeys(<string> dataInicial);
        await $("input[name='data-final']").sendKeys(<string> dataFinal);
    
    })

    Then(/^eu consigo visualizar que o aluno “([^\"]*)” está na uma lista dos alunos que pegaram esse livro entre essas datas, na data “([^\"]*)”.$/, async (nome, data) => {
       
        let allReservas : ElementArrayFinder = element.all(by.name('list-reservas'));
        let sameReserva = allReservas.filter(elem =>
                                      elem.getText().then(pAND(sameName(elem,nome),sameData(elem,data))));
        await sameReserva.then(elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
     
     })

})