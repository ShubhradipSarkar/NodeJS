//const { error } = require('console');
const fs = require('fs');

// Sync...
//fs.writeFileSync("./test1.txt", "Hey");

// Async...
fs.writeFile('./test.txt', 'Holulu Async 12345','utf8',(err)={});