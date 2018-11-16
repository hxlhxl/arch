#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
let [pathname, ext] = process.argv.slice(2);
ext = '.' + ext;

function fls(pathname, ext) {
    fs.readdir(pathname, (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (path.extname(file) === ext) {
                console.log(file);
            }
        })
    });
}

fls(pathname, ext);
