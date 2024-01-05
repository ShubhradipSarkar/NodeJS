

let http=require('http');
let dt=require('./myModule');
let fs=require('fs');

http.createServer(function(req, res){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('Hello Boi'+ dt.WhatIsDateTime());
}).listen(3000);

export{}