/*

确保只有一个实例，并提供全局访问。
有一些对象只需要一个，比如线程池。

*/



var solution = {
    a: function () {
        var Singleton = function (name) {
            this.name = name;
        }
        Singleton.prototype.getName = function () {
            return this.name;
        }
        Singleton.getInstance = function (name) {
            if (!this.instance) { // this ref to Singleton object.
                this.instance = new Singleton(name);
            }
            return this.instance;
        }
        var s1 = Singleton.getInstance("hx");
        var s2 = Singleton.getInstance("hxl");
        console.log(s1 === s2);
    },
    b: function () {
        var Singleton = function(name) {
            this.name = name;
        }
        Singleton.prototype.getName = function() {
            return this.name;
        }
        Singleton.getInstance = (function() {
            var instance = null;
            return function(name) {
                if (!instance) {
                    instance = new Singleton(name);
                }
                return instance;
            }
        })();
        var s1 = Singleton.getInstance("hx");
        var s2 = Singleton.getInstance("hxl");
        console.log(s1 === s2);
    },
    c: function() {
        // 类负责如何初始化该实例
        // 代理负责确保唯一的实例(使用闭包的形式)
    },
    d: function() {
        var getSingle = function(fn) {
            var result;
            return function() {
                return result || (result = fn.apply(this,arguments));   // this可以适当替换
            }
        }
    }
}