var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de livros vazia", () => {
    return request.get(base_url + "livros")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("só cadastra livros", () => {
    var options:any = {method: 'POST', uri: (base_url + "livro"), body:{nome: "Introdução a algoritimos", autor: "Samuel Oliveira", topico: "Algoritimos"}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({sucess: "O livro foi cadastrado com sucesso"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });
});