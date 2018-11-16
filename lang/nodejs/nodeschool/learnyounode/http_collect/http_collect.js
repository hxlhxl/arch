const http = require('http');
const url = process.argv[2] || "http://httpbin.org/get";

// 写文件
const fs = require('fs');
const path = require('path');
const writable = fs.createWriteStream(path.join(__dirname, 'response.txt'));

const req = http.request(url);
req.end()
var resStr = '';
req.on('response', (incomingMsg) => {
    incomingMsg.on('data', chunk => {
        resStr += chunk.toString('utf-8');
    }).on('end', () => {
        console.log('length: ', resStr.length);
        console.log(resStr);
    });

    incomingMsg.pipe(writable);
});

req.on('error', err => {
    console.log(err);
})
