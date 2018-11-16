const http = require('http');
const async = require('async');
const fetch = require('node-fetch');

urls = [
    'http://httpbin.org/user-agent',
    'http://httpbin.org/get',
    'http://httpbin.org/ip',
];


async.mapLimit(urls, 1, async url => {
    const response = await fetch(url);
    const body = await response.text();
    console.log(body);
})

