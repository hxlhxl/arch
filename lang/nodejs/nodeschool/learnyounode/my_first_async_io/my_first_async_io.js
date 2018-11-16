const fs = require('fs');
const filename = process.argv[1];
fs.readFile(filename, function(err, data) {
    console.log(data.toString('utf-8').split('\n').length);
})

var fn = '/home/husa/Downloads/pkg/android-studio-ide-181.5014246-linux.zip'
// 4023874
fs.readFile(fn, function(err, data) {
    console.log(data.toString('utf-8').split('\n').length);
})