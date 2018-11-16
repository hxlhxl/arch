const fs = require('fs');
const path = require('path');

module.exports = function fls(pathname, ext, callback) {
    fs.readdir(pathname, (err, files) => {
        if (err) return callback(err, []);
        const list = files.filter(file => path.extname(file) === ext);
        callback(null, list);
    })
}