// 使用装饰类 给对象动态添加/修改属性

var Plain = function() {}
Plain.prototype.fire = function() {
    console.log('普通子弹');
};

var MissileDecorator = function(plain) {
    this.plain = plain;
};
MissileDecorator.prototype.fire = function() {
    console.log('导弹');
}