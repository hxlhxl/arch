// 主要用于架构中的模板方法的确立，比如HttpServlet定义的doGet、doOption等方法

// Coffee or Tea

var Beverage = function(){}
Beverage.prototype.boilWater = function() {}
Beverage.prototype.brew = function() {}
Beverage.prototype.pourInCup = function() {}
Beverage.prototype.addCondiments = function() {}
Beverage.prototype.hook = function() {
    // 钩子判断
}
Beverage.prototype.init = function() {
    this.boilWater();
    this.brew();
    this.pourInCup();
    // 可以添加钩子判断，自定义对象操作
    this.addCondiments();
};

// 子类继承父类Beverage即可
var Coffee = function() {};
Coffee.prototype = new Beverage();
Coffee.prototype.brew = function() {
    console.log('用沸水冲泡咖啡');
}

// ...