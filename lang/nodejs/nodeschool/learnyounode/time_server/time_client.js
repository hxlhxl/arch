const net = require('net');

const socket = new net.Socket();
const option = {
    host: 'localhost',
    port: 8124
};
socket.connect(option);
socket.on('data', (chunk) => {
    console.log(chunk.toString('utf-8'));
});
socket.end()
