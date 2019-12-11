import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import request = require("request-promise");
import { Reserve } from "../../common/Reserve";
import { User } from "../../common/User";
import { Book } from "../../common/Book";
import { Notification } from "../../server/notification";
import { async } from 'q';
import { By } from 'selenium-webdriver';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

let base_url = "http://localhost:3000/";
let notification = new Notification(); 

async function login(name,cpf){
    await $("input[name='email-box']").sendKeys(<string> name);
    await $("input[name='password-box']").sendKeys(<string> cpf);
    await element(by.buttonText('Login')).click();
}

async function checkReserve(bookName,iniDate,endDate){
    let allreserves: ElementArrayFinder = element.all(by.name("reserve-list"))
    let book = await allreserves.filter(function(elem, index){
        return elem.element(by.name("reserve-book-name-list")).then(function(text){
            return (text === bookName) 
        }).then(function(elem){
            return elem.element(by.name("reserve-date-start-list")).then(function(date){
                return (iniDate ===  date)
            })
        }).then(function(elem){
            return elem.element(by.name("reserve-date-end-list")).then(function(date){
                return (endDate ===  date)
            })
        })
    })
}

async function reserveServer(idbook,email,bookName,iniDate,endDate){
    let reserve = new Reserve(new User('','email',''),new Book(idbook,'','','','',''),
    new Date(iniDate),new Date(endDate),true)
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^que loguei como "([^\"]*)" com login "([^\"]*)" e a senha "([^\"]*)"$/, async (name, email,password) => {
        await browser.get("http://localhost:4200/")
        await expect(browser.getTitle()).to.eventually.equal('Página Login');
        await login(email,password);
    })
    Given(/^eu tendo reservado o livro "([^\"]*)" de Id "(\d*)" do dia "([^\"]*)" ate "([^\"]*)"$/, async (bookName,bookId,startDate,endDate) => {
        
    })
    Given(/^o livro "([^\"]*)" de Id "(\d*)" sendo do petiano com login "([^\"]*)"$/, async (bookName,bookId,email) => {
        await request.get(base_url + "log/id/:" + bookId).then(
            body => console.log(body) 
        )
    })
    Given(/^estando o livro "([^\"]*)" de Id "(\d*)" com o petiano "([^\"]*)" com login "([^\"]*)" do dia "([^\"]*)" ate "([^\"]*)"$/, async (bookName,bookId,email,startDate,endDate) => {
        checkReserve(bookName,startDate,endDate);
    })
    Given(/^havendo uma reserva do livro "([^\"]*)" de Id "(\d*)" pelo petiano "([^\"]*)" com login "([^\"]*)"  do dia "([^\"]*)" até "([^\"]*)"$/, async (bookName,bookId,name, email,startDate,endDate) => {
        checkReserve(bookName,startDate,endDate);
    })
    When(/^eu confirmo que recebi o livro "([^\"]*)" de Id "(\d*)"$/, async (bookName, bookId) => {
        let allreserves: ElementArrayFinder = element.all(by.name("reserve-list"))
        let book = await allreserves.filter(function(elem, index){
            return elem.element(by.name("reserve-book-id-list")).then(function(text){
                return (text === bookId) 
            })
        })
    })
    When(/^solicito a reserva do livro "([^\"]*)" de Id "(\d*) do dia "([^\"]*)" ate "([^\"]*)"$/, async (bookName,bookId,startDate,endDate)  => {
        
    })
    Then(/^And o petiano com login ([^\"]*) vai receber um email informando que ([^\"]*) está com o livro ([^\"]*)"$/, async (email,userReserve,bookName) => {
        notification.sendEmail([email.toString()],"Seu livro - " + bookName + " - está seguro", "Seu livro esta com " + userReserve)
    })
    Then(/^o petiano com login "([^\"]*)" vai receber um email informando que "([^\"]*)" reservou o livro "([^\"]*)" do dia "([^\"]*)" ate "([^\"]*)"$/, async (email, name,startDate, endDate) => {
        notification.sendEmail([email.toString()],"Confirmacao Reserva", "Livro reservado de " + startDate + "até" + endDate)
    })
    Then(/^o petiano com login "([^\"]*)" nao vai receber um email informando que "([^\"]*)" reservou o livro "([^\"]*)" do dia "([^\"]*)" ate "([^\"]*)"$/, async (email, name,startDate, endDate) => {
        true
    })
    Then(/^eu vejo na tela uma mensagem confirmando recebimento$/, async () => {
        
    })
    
})