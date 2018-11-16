1. fs.readFile等其他读取数据方案，其回调函数会一次性读取所有数据，如果读取大文件，会栈溢出
2. fs.createReadStream, stream.on('data', fn)方案中，‘data’事件会多次触发，Node.js一次性最大读取64K字节，这个值可以调整
3. fs.readFileSync同步读取所有数据，大文件会栈溢出
4. http.createServer https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
5. stream的`end`事件只有在`data`事件结束后才会调用，所以如果没有data回调而直接调用end，那么`end`事件永远不会被触发