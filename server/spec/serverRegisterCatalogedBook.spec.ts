import request = require("request-promise");
import { closeServer } from '../server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de livros vazia", () => {
    return request.get(base_url + "catalogedBooks")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("só cadastra livros", () => {
  var options:any = {method: 'POST', uri: (base_url + "catalogedBook"), body:{ user:{name: "Cesar", email: "accs2@pet.cin.ufpe.br", password: "123"}, book:{id: 1, name: "Introdução a algoritimos", isbn:"isbn", author: "Samuel Oliveira", edition: "3", type: "Algoritimos"}}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({sucess: "O livro foi cadastrado com sucesso"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });
});