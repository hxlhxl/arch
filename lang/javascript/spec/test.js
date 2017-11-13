var Person = function(name) {
    this.name;
};
var p = new Person('hx');

console.log(p.construtor === Person);



var Person = function(name) {
    this.name;
};
Person.prototype = {
    getName: function() {
        return this.name;
    }
}
var p = new Person('hx');

console.log(p.construtor === Person);


