import express = require('express');
import bodyParser = require("body-parser");
import { Reserves } from './Reserves';
import { Reserve } from '../common/Reserve';


var server = express();
var reserves: Reserves = new Reserves();

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

server.listen(3000, function () {
  console.log('listening port 3000!')
})

server.get('/activeReserves',function(req: express.Request, res: express.Response){
  res.send(JSON.stringify(reserves.actives(req.body)));
})

server.get('/inactiveReserves',function(req: express.Request, res: express.Response){
  res.send(JSON.stringify(reserves.inactives(req.body)));
})

server.post('/reserve',function(req: express.Request, res: express.Response){
  var reserve:Reserve = <Reserve> req.body;
  var answer = reserves.delete(reserve);
  if(answer === "Success"){
    res.send({"success":"A Reserva foi Cancelada com Sucesso" })
  }else{
    res.send({"error":"Ocorreu um Erro durante o Cancelamento da Reserva"})
  }
})

server.post('/newReserve',function(req: express.Request, res: express.Response){
  var reserve:Reserve = <Reserve> req.body;
  var answer = reserves.create(reserve);
  if(answer[1] === "Success"){
    res.send({"success":"A Reserva foi Realizada com Sucesso","body":answer[0]});
  }else{
    res.send({"error":"Ocorreu um Erro na Realização da Reserva","body":answer[0]})
  }
})

server.put('/reserve', function(req: express.Request, res: express.Response){
  var reserveToUp: Reserve = <Reserve> req.body;
  var answer = reserves.update(reserveToUp);
  if(answer[1] === "Success"){
    res.send({"success":"A Reserva foi Extendida com Sucesso","body":answer[0]})
  }else{
    res.send({"error":"Ocorreu um Erro durante a Extenção da Reserva","body":answer[0]})
  }
})
