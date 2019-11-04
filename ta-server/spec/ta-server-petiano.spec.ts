var base_url = "http://localhost:3000/";

describe("O servidor", () => {
  var server:any;

  beforeAll(() => {server = require('../ta-server')});

  afterAll(() => {server.closeServer()});

  it("inicialmente retorna uma lista de petianos vazia", () => {
    return request.get(base_url + "petianos")
            .then(body => 
               expect(body).toBe("[]")
             )
            .catch(e => 
               expect(e).toEqual(null)
             );
  })

  it("só cadastra petianos", () => {
    var options:any = {method: 'POST', uri: (base_url + "petianos"), body:{nome: "Samuel Miranda", cpf: "12994511433", email: "sam@pet.ufpe.br", senha : "1234"}, json: true};
    return request(options)
             .then(body =>
                expect(body).toEqual({sucess: "O petiano foi cadastrado com sucesso"})
             ).catch(e =>
                expect(e).toEqual(null)
             )
  });

  it("não cadastra petianos com email diferente do email do pet", () => {

    var petiano = {"json":{nome: "Samuel Miranda", cpf: "12994511433", email: "sam@gmail.com", senha : "1234"}};
    var resposta = '{nome: "Samuel Miranda", cpf: "12994511433", email: "sam@gmail.com", senha : "1234"}';

    return request.post(base_url + "petianos", petiano)
             .then(body => {
                expect(body).toEqual({failure: "O petiano não pode ser cadastrado"});
                            return request.get(base_url + "petianos")
                                     .then(body => {
                                        expect(body).not.toContain(resposta);
                                      });
                          }).catch(err => {
                            expect(err).toEqual(null)
                         })
              })
  })


});