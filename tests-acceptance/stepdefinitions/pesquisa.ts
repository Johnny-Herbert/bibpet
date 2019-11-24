import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let mesmoNome = ((elem, nome) => elem.element(by.name('list-nome-livro')).getText().then(text => text === nome));
let mesmoAutor = ((elem, autor) => elem.element(by.name('list-autor-livro')).getText().then(text => text === autor));
let mesmotopico = ((elem, topico) => elem.element(by.name('list-topico-livro')).getText().then(text => text === topico));

let pAND = ((p,q,r) => p.then(a => q.then(b => r.then(c => a && b & c))));

const cadastrarAluno = async(nome : string, cpf: string, email : string, senha : string ) => {
    await element(by.name('button-cadastrar-aluno')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Cadastro');
    await $("input[name='nome-aluno-box']").sendKeys(<string> nome);
    await $("input[name='cpf-aluno-box']").sendKeys(<string> cpf);
    await $("input[name='email-aluno-box']").sendKeys(<string> email);
    await $("input[name='senha-aluno-box']").sendKeys(<string> senha);
    await element(by.name('button-fim-cadastro-aluno')).click();
    await expect(browser.getTitle()).to.eventually.equal('Página Alunos');
}

const cadastrarLivro = async(nome : string, autor : string, topico : string) => {
    await element(by.name('button-cadastrar-livro')).click();
    await $("input[name='nome-livro-box']").sendKeys(<string> nome);
    await $("input[name='autor-livro-box']").sendKeys(<string> autor);
    await $("input[name='topico-livro-box']").sendKeys(<string> topico);
    await element(by.name('button-fim-cadastro-livro')).click();
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

const logout = async () => {
    await element(by.name('button-sair')).click();
}

const pesquisaLivro = async (nomeLivro : string, autorLivro : string, topicoLivro : string) => {
    await $("input[name='pesquisa-nome-livro']").sendKeys(<string> nomeLivro);
    await $("input[name='pesquisa-autor-livro']").sendKeys(<string> autorLivro);
    await $("input[name='pesquisa-topico-livro']").sendKeys(<string> topicoLivro);
    await element(by.name("button-pesquisar")).click();
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^O petiano "([^\"]*)" de cpf "([^\"]*)" está logado no sistema com o email "([^\"]*)" e a senha "([^\"]*)"$/, async (nome, cpf, email, senha) => {
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('Página Login');
        await login("pet@pet.ufpe.br","123");
        await element(by.name("button-alunos")).click();
        await cadastrarAluno(<string>name, <string>cpf, <string>email, <string>senha);
        await verificarCadastro("aluno-list", <string>cpf, 1);
        await logout();
        await login(<string>email, <string>senha);
    });

    Given(/^está na tela Página Acervo$/, async () => {
        await element(by.name("button-acervo")).click();
        await expect.get(browser.getTitle()).to.eventually("Página Acervo");
    });

    Given(/^o livro de nome "([^\"]*)", de autor "([^\"]*)" e de tópico "([^\"]*)" está cadastrado no sistema$/, async (nome, autor, topico) => {
        await cadastrarLivro(<string>nome, <string>autor, <string>topico);
    });
    
    Given(/^eu vejo o livro de nome "([^\"]*)", de autor "([^\"]*)" e de tópico "([^\"]*)" na lista de livros cadastrados$/, async (nome, autor, topico) => {
        var livros : ElementArrayFinder = element.all(by.name('livro-list'));
        await livros.filter(elem => pAND(mesmoNome(elem, nome), mesmoAutor(elem, autor), mesmotopico(elem, topico))).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });
    
    When(/^eu pesquiso pelo nome "([^\"])"$/, async (nome) => {
        await pesquisaLivro(<string>nome, "", "");
    });

    Then(/^eu vejo na lista de livros o livro de nome "([^\"]*)" de autor "([^\"]*)" e de tópico "([^\"]*)"$/, async (nome, autor, topico) => {
        var livros : ElementArrayFinder = element.all(by.name('livro-list'));
        await livros.filter(elem => pAND(mesmoNome(elem, nome), mesmoAutor(elem, autor), mesmotopico(elem, topico))).then
        (elems => expect(Promise.resolve(elems.length)).to.eventually.equal(1));
    });

})