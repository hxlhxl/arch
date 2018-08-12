// link: https://www.cnblogs.com/xiaohuochai/p/5721552.html

var Person = function(name) {
	this.name = name;
}

Person.prototype = {
	getName: function() {
		return this.name;
	},

}

var p = new Person('hx');
console.log(p.getName());
