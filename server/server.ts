import express = require('express');
import bodyParser = require("body-parser");
import { CatalogedBooks } from "./CatalogedBooks";
import { CatalogedBook } from '../common/CatalogedBook';


var server = express();

var catalogedBooks: CatalogedBooks = new CatalogedBooks();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
server.use(allowCrossDomain);
server.use(bodyParser.json());

server.get('/', function (req: express.Request, res: express.Response) {
  res.send("Hello Word");
})

server.post('/catalogedBook', function(req: express.Request, res: express.Response) {
  var book: CatalogedBook = catalogedBooks.create(req.body);
  if(book) {
    res.send({sucess: "O livro foi cadastrado com sucesso"});
  }
  else {
    res.send({error: "O livro não pode ser cadastrado"});
  }
});

server.get('/catalogedBooks', function(req: express.Request, res: express.Response) {
  res.send(JSON.stringify(catalogedBooks.read()));
});

server.get('/catalogedBooks/:id', function(req: express.Request, res: express.Response) {
  res.send(JSON.stringify(catalogedBooks.readOnly(+req.params.id)));
});

server.get('/filterCatalogedBooks', function(req: express.Request, res: express.Response) {
  res.send(JSON.stringify(catalogedBooks.search(req.body.name,req.body.author,req.body.type)));
});

server.put('/catalogedBook', function(req: express.Request, res: express.Response) {
  var book: CatalogedBook = catalogedBooks.update(req.body);
  if(book) {
    res.send({sucess: "O livro foi atualizado com sucesso"});
  }
  else {
    res.send({error: "O livro não pode ser atualizado"});
  }
});

server.delete('/catalogedBook/:id', function(req: express.Request, res: express.Response) {
  var book = catalogedBooks.delete(+req.params.id);
  if(book) {
    res.send({sucess: "O livro foi excluido com sucesso"});
  }
  else {
    res.send({error: "O livro não pode ser excluido"});
  }
});


var openServer = server.listen(3000, function () {
  console.log('listening port 3000!')
})

function closeServer(): void {
  openServer.close();
}

export { openServer, closeServer }