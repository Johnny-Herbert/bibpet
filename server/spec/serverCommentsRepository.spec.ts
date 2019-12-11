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

});