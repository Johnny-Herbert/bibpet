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
  
  it("atualiza comentários corretamente", () => {
      return request.post(base_url + "comment", {"json":{id: 1, text: "O livro é muito bom!!", user: {name: "Johnny", email: "jhmn@pet.cin.ufpe.br", password: "5142"}}}).then(body => {
          expect(body).toEqual({success: "O comentário foi adicionado com sucesso"});
          return request.put(base_url + "comment", {"json":{id: 1, text: "Ainda precisa ser traduzido melhor", user: {name: "Johnny", email: "jhmn@pet.cin.ufpe.br", password: "5142"}}}).then(body => {
              expect(body).toEqual({success: "O comentário foi atualizado com sucesso"});
              return (request.get(base_url + "comments").then(body => {
                  expect(body).toContain('{"id":"1", "text":"Ainda precisa ser traduzido melhor", "user": {"name":"Johnny", "email" : "jhmn@pet.cin.ufpe.br", "password" : "5142"}}');
                  expect(body).not.toContain('{"id":"1", "text":"O livro é muito bom!!", "user": {"name":"Johnny", "email" : "jhmn@pet.cin.ufpe.br", "password" : "5142"}}');
              }))
          })
      })
  })

});