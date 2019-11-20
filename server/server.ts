import express = require('express');
import bodyParser = require("body-parser");


var server = express();

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
