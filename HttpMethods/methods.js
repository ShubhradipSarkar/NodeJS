// Methods -> GET, PUT, PATCH, POST, DELETE

// GET -> Getting web pages from server
// POST -> Post something

const http=require('http');
const fs=require('fs');

const Server=http.createServer((req, res)=>{

    //Making a log file and storing in server
    const date=Date.now();
    const log=`${date}: New Request Received\n`;

    fs.appendFile("log.txt", log, (err, data)=>{
        console.log(req.method);
        console.log('Request received');
    })
    res.end(`Hello from server at ${date} `);
    
});

const MyServer=http.createServer(Server);

MyServer.listen(3000, ()=>{"Server Running at port 3000"});

