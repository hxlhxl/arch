const fls = require('./fls');

let [pathname, ext] = process.argv.slice(2);
ext = '.' + ext;

fls(pathname, ext, (err, list) => {
    if (err) return console.error('There was an error', err);
    list.forEach(filename => console.log(filename))
});
