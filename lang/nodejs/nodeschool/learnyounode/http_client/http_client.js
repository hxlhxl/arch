const http = require('http');
// const url = process.argv[2] || "http://httpbin.org";
const url = process.argv[2] || "http://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0&rsv_idx=1&tn=baidu&wd=repeal&rsv_pq=b7e321240000d350&rsv_t=561bMOW4JRsiMDIhnBxgYxM5qxRWSTTyyc3UG20jl%2FRpaYjUkyHoRqRyJHg&rqlang=cn&rsv_enter=1&rsv_sug3=1&rsv_sug1=1&rsv_sug7=001&rsv_sug2=1&rsp=0&rsv_sug9=es_1_1&rsv_sug4=3334&rsv_sug=9";
const req = http.request(url);
req.end()
req.on('response', (incomingMsg) => {
    incomingMsg.on('data', chunk => {
        console.log(chunk.toString('utf-8'));
    })
});
req.on('error', err => {
    console.log(err);
})
