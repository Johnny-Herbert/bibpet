import { defineSupportCode } from 'cucumber';
import request = require("request-promise");
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var base_url = "http://localhost:3000/";
//Issue #14
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^"(\d*)" e um petiano cadastrado no sistema com a senha “(\d*)”.".$/, async (login,senha) => {
        var petiano = {"json":{"login": login, "senha": senha}};
        await request.post(base_url + "cadastrarPetiano", petiano).then(body =>{
            expect(body).toEqual({success: "O petiano foi cadastrado com sucesso"});
        })
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equals('BibPET');
        await $("input[name='loginbox']").sendKeys(<string> login);
        await $("input[name='senhabox']").sendKeys(<string> senha);
        await $("a[name='loginbutton']").click();
    })

    Given(/^O livro “(\d*)” esta cadastrado com o tempo máximo de reserva sendo “(\d*)”, seu dono Sendo “(\d*)”, seu tema sendo “(\d*)” e seu id sendo “(\d*)”.$/, 
    async (nome,tempoMax,dono,tema,id) => {
        var livro = {"json":{"nome": nome,"tempoMax": tempoMax,"dono": dono,"tema": 
            tema,"id":id}};
        await request.post(base_url + "cadastrarLivro", livro).then(body =>{
            expect(body).toEqual({success: "O livro foi cadastrado com sucesso"});
        })
    });

    Given(/^Nao ha nenhuma reserva no sistema para o livro "(\d*)" de id “(\d*)” no intervalo de "(\d*)" até "(\d*)".$/, 
    async (nome,id,dtInicial,dtFinal) => {
        var verifica = {"json":{"nome": nome,"id":id,"dtInicio": dtInicial,"dtFinal": dtFinal}};
        await request.post(base_url + "verificarDisponibilidade", verifica).then(body =>{
            expect(body).toEqual({free: "O livro está livre nesse intervalo de datas"});
        })
    });

    Given(/^Estou na página do livro de id "(\d*)".$/, async (id) => {
        await element(by.buttonText('menuPesquisar')).click();
        await $("input[name='idsearch']").sendKeys(<string> id);
        await element(by.buttonText('pesquisar')).click();
    });

    When(/^Eu solicito a reserva do livro no intervalo de "(\d*)" até "(\d*)".$/,
     async (dtInicial,dtFinal) => {
        await $("input[name='dtInicialBox']").sendKeys(<string> dtInicial);
        await $("input[name='dtFinalBox']").sendKeys(<string> dtFinal);
        await $("a[name='reserveButton']").click();
    });

    Then(/^Eu recebo uma mensagem de confirmação de reserva.$/, async () => {
        await $("label[name='mensagem']").getText().equal('Livro Reservado com Sucesso');
    });

    Then(/^Há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/,
         async (nome,id,dtInicial,dtFinal,petiano) => {
        var reserva = {"nome": nome,"id":id,"dtInicial": dtInicial,
        "dtFinal":dtFinal,"petiano":petiano};
        await request.get(base_url + "reservas").then(body =>{
            expect(body).toContain(reserva);
        })
    });

})
//Issue #15
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^"(\d*)" e um petiano cadastrado no sistema com a senha “(\d*)”.".$/, async (login,senha) => {
        var petiano = {"json":{"login": login, "senha": senha}};
        await request.post(base_url + "cadastrarPetiano", petiano).then(body =>{
            expect(body).toEqual({success: "O petiano foi cadastrado com sucesso"});
        })
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equals('BibPET');
        await $("input[name='loginbox']").sendKeys(<string> login);
        await $("input[name='senhabox']").sendKeys(<string> senha);
        await $("a[name='loginbutton']").click();
    })

    Given(/^O livro “(\d*)” esta cadastrado no sistema com o tempo máximo de reserva sendo “(\d*)”, seu dono Sendo “(\d*)”, seu tema sendo “(\d*)” e seu id sendo “(\d*)”.$/, 
    async (nome,tempoMax,dono,tema,id) => {
        var livro = {"json":{"nome": nome,"tempoMax": tempoMax,"dono": dono,"tema": 
            tema,"id":id}};
        await request.post(base_url + "cadastrarLivro", livro).then(body =>{
            expect(body).toEqual({success: "O livro foi cadastrado com sucesso"});
        })
    });

    Given(/^Nao ha nenhuma reserva no sistema para o livro "(\d*)" de id “(\d*)” no periodo de "(\d*)" até "(\d*)".$/, 
    async (nome,id,dtInicial,dtFinal) => {
        var verifica = {"json":{"nome": nome,"id":id,"dtInicio": dtInicial,"dtFinal": dtFinal}};
        await request.post(base_url + "verificarDisponibilidade", verifica).then(body =>{
            expect(body).toEqual({free: "O livro está livre nesse intervalo de datas"});
        })
    });

    Given(/^Estou na página do livro com id "(\d*)".$/, async (id) => {
        await element(by.buttonText('menuPesquisar')).click();
        await $("input[name='idsearch']").sendKeys(<string> id);
        await element(by.buttonText('pesquisar')).click();
    });

    When(/^Eu reservo o livro no intervalo de "(\d*)" até "(\d*)".$/,
     async (dtInicial,dtFinal) => {
        await $("input[name='dtInicialBox']").sendKeys(<string> dtInicial);
        await $("input[name='dtFinalBox']").sendKeys(<string> dtFinal);
        await $("a[name='reserveButton']").click();
    });

    Then(/^Eu recebo uma mensagem de erro avisando que o livro “(\d*)” de id "(\d*)" possui um tempo Máximo de reserva de "(\d*)" dias.$/,
         async (nome,id,tempoMax) => {
        await $("label[name='mensagem']").getText().equal('Falha na Reserva o Livro '+nome+' de id '+id+' possui o tempo maximo de reserva igual a '+tempoMax+' dias.');
    });

    Then(/^Não há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/,
         async (nome,id,dtInicial,dtFinal,petiano) => {
        var reserva = {"nome": nome,"id":id,"dtInicial": dtInicial,
        "dtFinal":dtFinal,"petiano":petiano};
        await request.get(base_url + "reservas").then(body =>{
            expect(body).not.toContain(reserva);
        })
    });

})
//Issue #16
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^"(\d*)" e um petiano cadastrado no sistema com a senha “(\d*)”.".$/, async (login,senha) => {
        var petiano = {"json":{"login": login, "senha": senha}};
        await request.post(base_url + "cadastrarPetiano", petiano).then(body =>{
            expect(body).toEqual({success: "O petiano foi cadastrado com sucesso"});
        })
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equal('BibPET');
        await $("input[name='loginbox']").sendKeys(<string> login);
        await $("input[name='senhabox']").sendKeys(<string> senha);
        await $("a[name='loginbutton']").click();
    })

    Given(/^Há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/,
         async (nome,id,dtInicial,dtFinal,petiano) => {
        var reserva = {"nome": nome,"id":id,"dtInicial": dtInicial,
        "dtFinal":dtFinal,"petiano":petiano};
        await request.get(base_url + "reservas").then(body =>{
            expect(body).toContain(reserva);
        })
    });

    Given(/^Estou na página "(\d*)".$/, async (pagina) => {
        await element(by.buttonText(pagina.toString())).click();
    });

    When(/^Eu solicito o cancelamento da reserva do livro de id "(\d*).$/,
     async (nome,id,dtInicial,dtFinal) => {
        await element(by.cellText(id)).select();
        await element(by.buttonText('cancelar')).click();
    });

    Then(/^Eu recebo uma mensagem confirmando o cancelamento reserva.$/, async () => {
        await $("label[name='mensagem']").getText().equal('Reserva Cancelada');
    });

    Then(/^Não há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/,
         async (nome,id,dtInicial,dtFinal,petiano) => {
        var reserva = {"nome": nome,"id":id,"dtInicial": dtInicial,
        "dtFinal":dtFinal,"petiano":petiano};
        await request.get(base_url + "reservas").then(body =>{
            expect(body).not.toContain(reserva);
        })
    })
})
//Issue #17
defineSupportCode(function ({ Given, When, Then }) {
    Given(/^"(\d*)" e um petiano cadastrado no sistema com a senha “(\d*)”.".$/, async (login,senha) => {
        var petiano = {"json":{"login": login, "senha": senha}};
        await request.post(base_url + "cadastrarPetiano", petiano).then(body =>{
            expect(body).toEqual({success: "O petiano foi cadastrado com sucesso"});
        })
        await browser.get("http://localhost:4200/");
        await expect(browser.getTitle()).to.eventually.equals('BibPET');
        await $("input[name='loginbox']").sendKeys(<string> login);
        await $("input[name='senhabox']").sendKeys(<string> senha);
        await $("a[name='loginbutton']").click();
    })

    Given(/^Há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/,
         async (nome,id,dtInicial,dtFinal,petiano) => {
        var reserva = {"nome": nome,"id":id,"dtInicial": dtInicial,
        "dtFinal":dtFinal,"petiano":petiano};
        await request.get(base_url + "reservas").then(body =>{
            expect(body).toContain(reserva);
        })
    });

    Given(/^Estou na página "(\d*)".$/, async (pagina) => {
        await element(by.buttonText(pagina)).click();
    });

    When(/^Eu solicito a extensão da reserva do livro de id "(\d*)" no intervalo de "(\d*)" até "(\d*)".$/,
     async (id,dtInicial,dtFinal) => {
        await element(by.cellText(id)).select();
        await $("input[name='dtInicialBox']").sendKeys(<string> dtInicial);
        await $("input[name='dtFinalBox']").sendKeys(<string> dtFinal);
        await element(by.buttonText('estender')).click();
    });

    Then(/^Eu recebo uma mensagem confirmando a extensão reserva.$/, async () => {
        await $("label[name='mensagem']").getText().equal('Reserva Estendida');
    });

    Then(/^Há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/,
         async (nome,id,dtInicial,dtFinal,petiano) => {
        var reserva = {"nome": nome,"id":id,"dtInicial": dtInicial,
        "dtFinal":dtFinal,"petiano":petiano};
        await request.get(base_url + "reservas").then(body =>{
            expect(body).toContain(reserva);
        })
    });
})
