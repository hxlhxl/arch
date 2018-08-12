

var Singleton = function(name) {
	this.name = name;
}

Singleton.prototype.getName = function() {
	return this.name;
}

Singleton.getInstance = function(name) {
	if (!this.instance) {
		this.instance = new Singleton(name);
	}
	return this.instance;
}

s1 = Singleton.getInstance('hx');
s2 = Singleton.getInstance('ll');
console.log(s1.getName(),s2.getName())
