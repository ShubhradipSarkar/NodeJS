const http=require('http');
const fs=require('fs');

const myServer=http.createServer((req, res)=>{

    //Making a log file and storing in server
    const date=Date.now();
    const log=`${date}: New Request Received\n`;

    fs.appendFile("log.txt", log, (err, data)=>{
        console.log('Request received');
        console.log(req.method);
    })
    res.end(`Hello from server at ${date} `);
    
}).listen(3000);