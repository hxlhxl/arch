const http = require('http');

urls = [
    'http://httpbin.org/user-agent',
    'http://httpbin.org/get',
    'http://httpbin.org/ip',
];

function makeRequest(url) {
    return new Promise((resolve, reject) => {
        var str = '';
        const req = http.request(url);
        req.end();
        req.on('response', msg => {
            msg.on('data', chunk => {
                str += chunk.toString('utf-8');
            }).on('end', () => {
                resolve(str);
            })
        })
    });
}

Promise.all(urls.map(url => makeRequest(url))).then(
    xhrs => {
        xhrs.forEach(xhr => {
            console.log(xhr);
            console.log('++++++++')
        })
    }
)

