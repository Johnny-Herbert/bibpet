import express = require('express');
import bodyParser = require("body-parser");
import { Comments } from "./Comments";
import { Comment } from '../common/Comment';


var server = express();

var comments: Comments = new Comments();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
server.use(allowCrossDomain);
server.use(bodyParser.json());

server.post('/comment', function(req: express.Request, res: express.Response) {
  var comment: Comment = comments.create(req.body);
  if(comment) {
    res.send({sucess: "O comentário foi adicionado com sucesso"});
  }
  else {
    res.send({error: "O comentário não foi adicionado com sucesso"});
  }
});

server.get('/comments', function(req: express.Request, res: express.Response) {
  res.send(JSON.stringify(comments.read()));
});

server.put('/comments', function(req: express.Request, res: express.Response) {
  var comment: Comment = comments.update(req.body);
  if(comment) {
    res.send({sucess: "O comentário foi atualizado com sucesso"});
  }
  else {
    res.send({error: "O comentário não foi atualizado com sucesso"});
  }
});

server.delete('/comment/:id', function(req: express.Request, res: express.Response) {
  var comment = comments.delete(+req.params.id);
  if(comment) {
    res.send({sucess: "O comentário foi excluido com sucesso"});
  }
  else {
    res.send({error: "O comentário não pode ser excluido"});
  }
});


var openServer = server.listen(3000, function () {
  console.log('listening port 3000!')
})

function closeServer(): void {
  openServer.close();
}

export { openServer, closeServer }
