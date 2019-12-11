import request = require("request-promise");
import { closeServer } from '../server';

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista vazia de comentários", () => {
    return request.get(base_url + "comments")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("insere comentários corretamente", () => {
  var options:any = {method: 'POST', uri: (base_url + "comment"), body:{ id: 1, text: "O livro é muito bom!!", user: {name: "Johnny", email: "jhmn@pet.cin.ufpe.br", password: "5142"}}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({sucess: "O comentário foi adicionado com sucesso"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

});