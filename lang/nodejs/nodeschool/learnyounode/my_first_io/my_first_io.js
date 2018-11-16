const fs = require('fs');
const filename = process.argv[1];
// const data = fs.readFileSync(filename, {encoding: 'utf-8'});
const data = fs.readFileSync(filename);
console.log(data.toString('utf-8').split('\n').length)


let count = 0;
var fn = '/home/husa/Downloads/pkg/android-studio-ide-181.5014246-linux.zip'
const stream = fs.createReadStream(fn)
stream.on('data', function(chunk) {
    for (let i=0; i < chunk.length; i++) {
        if (chunk[i] === 10) count++;
    }
}).on('end', function() {
    console.log(count); // 4023874
})
