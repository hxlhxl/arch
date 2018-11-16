const fs = require('fs');
const http = require('http');

const server = http.createServer();

server
    .on('request', (request, response) => {
        request
            .on('data', (chunk) => {})
            .on('end', () => {
            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.write(JSON.stringify({ 'responseBody': 'aaa' }));
            response.end();
        });
    })
    .on('error', (err) => {
        console.log(err);
    })

server.listen(8124);
