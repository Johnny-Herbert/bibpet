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
const request = require("request-promise");
const protractor_1 = require("protractor");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
var base_url = "http://localhost:3000/";
//Issue #14
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^"(\d*)" e um petiano cadastrado no sistema com a senha “(\d*)”.".$/, (login, senha) => __awaiter(this, void 0, void 0, function* () {
        var petiano = { "json": { "login": login, "senha": senha } };
        yield request.post(base_url + "cadastrarPetiano", petiano).then(body => {
            expect(body).toEqual({ success: "O petiano foi cadastrado com sucesso" });
        });
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('BibPET');
        yield protractor_1.$("input[name='loginbox']").sendKeys(login);
        yield protractor_1.$("input[name='senhabox']").sendKeys(senha);
        yield protractor_1.$("a[name='loginbutton']").click();
    }));
    Given(/^O livro “(\d*)” esta cadastrado com o tempo máximo de reserva sendo “(\d*)”, seu dono Sendo “(\d*)”, seu tema sendo “(\d*)” e seu id sendo “(\d*)”.$/, (nome, tempoMax, dono, tema, id) => __awaiter(this, void 0, void 0, function* () {
        var livro = { "json": { "nome": nome, "tempoMax": tempoMax, "dono": dono, "tema": tema, "id": id } };
        yield request.post(base_url + "cadastrarLivro", livro).then(body => {
            expect(body).toEqual({ success: "O livro foi cadastrado com sucesso" });
        });
    }));
    Given(/^Nao ha nenhuma reserva no sistema para o livro "(\d*)" de id “(\d*)” no intervalo de "(\d*)" até "(\d*)".$/, (nome, id, dtInicial, dtFinal) => __awaiter(this, void 0, void 0, function* () {
        var verifica = { "json": { "nome": nome, "id": id, "dtInicio": dtInicial, "dtFinal": dtFinal } };
        yield request.post(base_url + "verificarDisponibilidade", verifica).then(body => {
            expect(body).toEqual({ free: "O livro está livre nesse intervalo de datas" });
        });
    }));
    Given(/^Estou na página do livro de id "(\d*)".$/, (id) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('menuPesquisar')).click();
        yield protractor_1.$("input[name='idsearch']").sendKeys(id);
        yield protractor_1.element(protractor_1.by.buttonText('pesquisar')).click();
    }));
    When(/^Eu solicito a reserva do livro no intervalo de "(\d*)" até "(\d*)".$/, (dtInicial, dtFinal) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='dtInicialBox']").sendKeys(dtInicial);
        yield protractor_1.$("input[name='dtFinalBox']").sendKeys(dtFinal);
        yield protractor_1.$("a[name='reserveButton']").click();
    }));
    Then(/^Eu recebo uma mensagem de confirmação de reserva.$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("label[name='mensagem']").getText().equal('Livro Reservado com Sucesso');
    }));
    Then(/^Há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/, (nome, id, dtInicial, dtFinal, petiano) => __awaiter(this, void 0, void 0, function* () {
        var reserva = { "nome": nome, "id": id, "dtInicial": dtInicial,
            "dtFinal": dtFinal, "petiano": petiano };
        yield request.get(base_url + "reservas").then(body => {
            expect(body).toContain(reserva);
        });
    }));
});
//Issue #15
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^"(\d*)" e um petiano cadastrado no sistema com a senha “(\d*)”.".$/, (login, senha) => __awaiter(this, void 0, void 0, function* () {
        var petiano = { "json": { "login": login, "senha": senha } };
        yield request.post(base_url + "cadastrarPetiano", petiano).then(body => {
            expect(body).toEqual({ success: "O petiano foi cadastrado com sucesso" });
        });
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('BibPET');
        yield protractor_1.$("input[name='loginbox']").sendKeys(login);
        yield protractor_1.$("input[name='senhabox']").sendKeys(senha);
        yield protractor_1.$("a[name='loginbutton']").click();
    }));
    Given(/^O livro “(\d*)” esta cadastrado no sistema com o tempo máximo de reserva sendo “(\d*)”, seu dono Sendo “(\d*)”, seu tema sendo “(\d*)” e seu id sendo “(\d*)”.$/, (nome, tempoMax, dono, tema, id) => __awaiter(this, void 0, void 0, function* () {
        var livro = { "json": { "nome": nome, "tempoMax": tempoMax, "dono": dono, "tema": tema, "id": id } };
        yield request.post(base_url + "cadastrarLivro", livro).then(body => {
            expect(body).toEqual({ success: "O livro foi cadastrado com sucesso" });
        });
    }));
    Given(/^Nao ha nenhuma reserva no sistema para o livro "(\d*)" de id “(\d*)” no periodo de "(\d*)" até "(\d*)".$/, (nome, id, dtInicial, dtFinal) => __awaiter(this, void 0, void 0, function* () {
        var verifica = { "json": { "nome": nome, "id": id, "dtInicio": dtInicial, "dtFinal": dtFinal } };
        yield request.post(base_url + "verificarDisponibilidade", verifica).then(body => {
            expect(body).toEqual({ free: "O livro está livre nesse intervalo de datas" });
        });
    }));
    Given(/^Estou na página do livro com id "(\d*)".$/, (id) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText('menuPesquisar')).click();
        yield protractor_1.$("input[name='idsearch']").sendKeys(id);
        yield protractor_1.element(protractor_1.by.buttonText('pesquisar')).click();
    }));
    When(/^Eu reservo o livro no intervalo de "(\d*)" até "(\d*)".$/, (dtInicial, dtFinal) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("input[name='dtInicialBox']").sendKeys(dtInicial);
        yield protractor_1.$("input[name='dtFinalBox']").sendKeys(dtFinal);
        yield protractor_1.$("a[name='reserveButton']").click();
    }));
    Then(/^Eu recebo uma mensagem de erro avisando que o livro “(\d*)” de id "(\d*)" possui um tempo Máximo de reserva de "(\d*)" dias.$/, (nome, id, tempoMax) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("label[name='mensagem']").getText().equal('Falha na Reserva o Livro ' + nome + ' de id ' + id + ' possui o tempo maximo de reserva igual a ' + tempoMax + ' dias.');
    }));
    Then(/^Não há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/, (nome, id, dtInicial, dtFinal, petiano) => __awaiter(this, void 0, void 0, function* () {
        var reserva = { "nome": nome, "id": id, "dtInicial": dtInicial,
            "dtFinal": dtFinal, "petiano": petiano };
        yield request.get(base_url + "reservas").then(body => {
            expect(body).not.toContain(reserva);
        });
    }));
});
//Issue #16
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^"(\d*)" e um petiano cadastrado no sistema com a senha “(\d*)”.".$/, (login, senha) => __awaiter(this, void 0, void 0, function* () {
        var petiano = { "json": { "login": login, "senha": senha } };
        yield request.post(base_url + "cadastrarPetiano", petiano).then(body => {
            expect(body).toEqual({ success: "O petiano foi cadastrado com sucesso" });
        });
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('BibPET');
        yield protractor_1.$("input[name='loginbox']").sendKeys(login);
        yield protractor_1.$("input[name='senhabox']").sendKeys(senha);
        yield protractor_1.$("a[name='loginbutton']").click();
    }));
    Given(/^Há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/, (nome, id, dtInicial, dtFinal, petiano) => __awaiter(this, void 0, void 0, function* () {
        var reserva = { "nome": nome, "id": id, "dtInicial": dtInicial,
            "dtFinal": dtFinal, "petiano": petiano };
        yield request.get(base_url + "reservas").then(body => {
            expect(body).toContain(reserva);
        });
    }));
    Given(/^Estou na página "(\d*)".$/, (pagina) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText(pagina)).click();
    }));
    When(/^Eu solicito o cancelamento da reserva do livro de id "(\d*).$/, (nome, id, dtInicial, dtFinal) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.cellText(id)).select();
        yield protractor_1.element(protractor_1.by.buttonText('cancelar')).click();
    }));
    Then(/^Eu recebo uma mensagem confirmando o cancelamento reserva.$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("label[name='mensagem']").getText().equal('Reserva Cancelada');
    }));
    Then(/^Não há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/, (nome, id, dtInicial, dtFinal, petiano) => __awaiter(this, void 0, void 0, function* () {
        var reserva = { "nome": nome, "id": id, "dtInicial": dtInicial,
            "dtFinal": dtFinal, "petiano": petiano };
        yield request.get(base_url + "reservas").then(body => {
            expect(body).not.toContain(reserva);
        });
    }));
});
//Issue #17
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^"(\d*)" e um petiano cadastrado no sistema com a senha “(\d*)”.".$/, (login, senha) => __awaiter(this, void 0, void 0, function* () {
        var petiano = { "json": { "login": login, "senha": senha } };
        yield request.post(base_url + "cadastrarPetiano", petiano).then(body => {
            expect(body).toEqual({ success: "O petiano foi cadastrado com sucesso" });
        });
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.browser.getTitle()).to.eventually.equal('BibPET');
        yield protractor_1.$("input[name='loginbox']").sendKeys(login);
        yield protractor_1.$("input[name='senhabox']").sendKeys(senha);
        yield protractor_1.$("a[name='loginbutton']").click();
    }));
    Given(/^Há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/, (nome, id, dtInicial, dtFinal, petiano) => __awaiter(this, void 0, void 0, function* () {
        var reserva = { "nome": nome, "id": id, "dtInicial": dtInicial,
            "dtFinal": dtFinal, "petiano": petiano };
        yield request.get(base_url + "reservas").then(body => {
            expect(body).toContain(reserva);
        });
    }));
    Given(/^Estou na página "(\d*)".$/, (pagina) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText(pagina)).click();
    }));
    When(/^Eu solicito a extensão da reserva do livro de id "(\d*)" no intervalo de "(\d*)" até "(\d*)".$/, (id, dtInicial, dtFinal) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.cellText(id)).select();
        yield protractor_1.$("input[name='dtInicialBox']").sendKeys(dtInicial);
        yield protractor_1.$("input[name='dtFinalBox']").sendKeys(dtFinal);
        yield protractor_1.element(protractor_1.by.buttonText('estender')).click();
    }));
    Then(/^Eu recebo uma mensagem confirmando a extensão reserva.$/, () => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.$("label[name='mensagem']").getText().equal('Reserva Estendida');
    }));
    Then(/^Há uma  reserva no sistema para o livro "(\d*)" de id "(\d*)" no intervalo de "(\d*)" até "(\d*)" em nome de "(\d*)".$/, (nome, id, dtInicial, dtFinal, petiano) => __awaiter(this, void 0, void 0, function* () {
        var reserva = { "nome": nome, "id": id, "dtInicial": dtInicial,
            "dtFinal": dtFinal, "petiano": petiano };
        yield request.get(base_url + "reservas").then(body => {
            expect(body).toContain(reserva);
        });
    }));
});
