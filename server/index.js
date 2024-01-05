var http = require('http');
var dt = require('../Modules/myModule');
var fs = require('fs');
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Hello Boi' + dt.WhatIsDateTime());
}).listen(3000);
