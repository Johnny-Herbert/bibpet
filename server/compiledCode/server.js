"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
var server = express();
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
server.use(allowCrossDomain);
server.use(bodyParser.json());
server.get('/', function (req, res) {
    res.send("Hello World");
});
server.listen(3000, function () {
    console.log('listening port 3000!');
});
//# sourceMappingURL=server.js.map