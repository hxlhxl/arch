// import _ from 'lodash';
var _ = require('lodash');

var arr = [1, 2, 3];
var test = function() {

    _.forEach(arr, function(item) {
        console.log(item);
        if (item == 2) return false;
    });
}

console.log(test());