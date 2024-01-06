const http=require('http');
const fs=require('fs');
const express=require("express");

const app=express();

app.get("/",(req, res)=>{
    return res.send("hello from home page");
});

app.get("/about",(req, res)=>{
    return res.send("This is the about page" + " Hello " + req.query.name);
});


// function myServo(req, res){
//     const date=Date.now();
//     const log=`${date}: New Request Received\n`;

//     fs.appendFile("log.txt", log, (err, data)=>{
//         console.log('Request received');
//         console.log(req.method);
//     })
//     res.end(`Hello from server at ${date} `);
// }

// const myServer=http.createServer(app);



app.listen(3000)