/*

装饰者模式：给对象动态地增加职责。该模式能在不改变对象自身的基础上，在程序运行期间给对象动态的添加职责。
场景：飞机升级(普通子弹、导弹、原子弹)
应用：ES6装饰器，装饰函数【AOP分离业务与统计代码，AOP改变函数参数】
*/

var classDeco = function () {
    var Plane = function () {};
    Plane.prototype.fire = function () {
        console.log('普通子弹');
    }
    var MissileDecorator = function (plane) {
        this.plane = plane;
    };
    MissileDecorator.prototype.fire = function () {
        console.log('导弹');
    };

    var AtomDecorator = function (plane) {
        this.plane = plane;
    };
    AtomDecorator.prototype.fire = function () {
        console.log('原子弹');
    }
};

var modifyArgs = function() {
    Function.prototype.before = function(beforeFn) {
        var __self = this;
        return function() {
            beforeFn.apply(this,arguments); // arguments发生了改变
            return __self.apply(this,arguments);
        };
    };
    var func = function(param) {
        console.log(param);
    };
    func = func.before(function(param) {
        param.b = 'b';
    });
    func({a:'a'});
}