import express = require('express');
import bodyParser = require("body-parser");
import { Reserves } from "./Reserves";
import { Notification } from "./notification";

let server = express();

var allowCrossDomain = function(req: any, res: any, next: any) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
server.use(allowCrossDomain);
server.use(bodyParser.json());

let reserves = new Reserves()
let notifications = new Notification()

server.get('/', function (req: express.Request, res: express.Response) {
  res.send("Hello Word");
})
server.get('/log/:id/:startdate/:enddate', function (req: express.Request, res: express.Response) {
  res.send(reserves.log(parseInt(req.params.id),
            new Date(req.params.startdate),new Date(req.params.enddate)));
})
server.get('/log/id/:id', function (req: express.Request, res: express.Response) {
  res.send(reserves.logByBook(parseInt(req.params.id)));
})
server.get('/log/date/:startdate/:enddate', function (req: express.Request, res: express.Response) {
  res.send(reserves.logByDate(new Date(req.params.startdate),new Date(req.params.enddate)));
})
server.get('/log/email/:email', function (req: express.Request, res: express.Response) {
  res.send(reserves.logByEmail(req.params.email));
})

server.post('/notification', function (req: express.Request, res: express.Response) {
  res.send(notifications.sendEmail(<Array<string>> req.body.to,
                                   <string> req.body.subject,
                                   <string> req.body.message));
})

server.listen(3000, function () {
  console.log('listening port 3000!')
})