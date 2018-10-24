// var _ = require('lodash');

function sayHello(to) {
    // return 'Hello, World!';
    console.log($);
    return _.template("Hello, <%= name %>!")({name: to});
}
