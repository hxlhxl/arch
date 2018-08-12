


function New() {
	var obj = new Object();
	// var Constructor = Array.prototype.shift.call(arguments);
	var Constructor = [].shift.call(arguments);
	obj.__proto__ = Constructor.prototype;
	Constructor.apply(obj,arguments);
	return obj;
}

var Person = function(name) {
	this.name = name;
}
Person.prototype.getName = function() {
	return this.name;
}

var p = New(Person,'hx');
console.log(p.getName());
