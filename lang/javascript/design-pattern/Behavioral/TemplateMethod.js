/*

定义： 定义一个操作中算法的框架，而将一些步骤延迟到子类中。模板方法模式使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

*/


var demo = function () {
    var Coffee = function () {};
    Coffee.prototype = {
        constructor: Coffee,
        boilWater: function () {
            console.log('把水煮沸');
        },
        brewCoffeeGriends: function () {
            console.log('沸水冲泡咖啡');
        },
        pourInCup: function () {
            console.log('咖啡倒进杯子');
        },
        addSugarAndMilk: function () {
            console.log('加糖和牛奶');
        },
        init: function () {
            this.boilWater();
            this.brewCoffeeGriends();
            this.pourInCup();
            this.addSugarAndMilk();
        }
    };
    var coffee = new Coffee('aaa');
    coffee.init();

    var Tea = function () {

    };
    Tea.prototype = {
        constructor: Tea,
        boilWater: function () {
            console.log('把水煮沸');
        },
        steepTeaBag: function () {
            console.log('沸水冲泡茶叶');
        },
        pourInCup: function () {
            console.log('茶叶倒进杯子');
        },
        addLemon: function () {
            console.log('加柠檬');
        },
        init: function () {
            this.boilWater();
            this.steepTeaBag();
            this.pourInCup();
            this.addLemon();
        }
    }
};
demo();



var template = function () {
    var Beverage = function () {};
    Beverage.prototype.boilWater = function () {
            console.log('把水煮沸');
        },
        Beverage.prototype.brew = function () {};
    Beverage.prototype.pourInCup = function () {};
    Beverage.prototype.addCondiments = function () {};
    Beverage.prototype.init = function () {
        this.boilWater();
        this.brew();
        this.pourInCup();
        this.addCondiments();
    };

    var Coffee = function () {};
    Coffee.prototype = new Beverage();
    Coffee.prototype.brew = function () {
        console.log('用沸水泡咖啡');
    };
    Coffee.prototype.pourInCup = function () {
        console.log('咖啡倒进杯子');
    };
    Coffee.prototype.addCondiments = function () {
        console.log('加糖和牛奶');
    };

    var Tea = function () {};
    Tea.prototype = new Beverage();
    Tea.prototype.brew = function () {
        console.log('用沸水浸泡茶叶');
    };
    Tea.prototype.pourInCup = function () {
        console.log('把茶叶倒进杯子');
    };
    Tea.prototype.addCondiments = function () {
        console.log('加柠檬');
    };
    var tea = new Tea();
    tea.init();
}

var simpleTemplate = function () {
    var Beverage = function (param) {
        var boilWater = function () {
            console.log('把水煮沸');
        };
        var brew = param.brew || function () {
            throw new Error('必须传递brew方法');
        };
        var pourInCup = param.pourInCup || function () {
            throw new Error('必须传递pourInCup方法');
        };
        var addCondiments = param.addCondiments || function () {
            throw new Error('必须传递addCondiments方法');
        };
        var F = function () {};
        F.prototype.init = function () {
            boilWater();
            brew();
            pourInCup();
            addCondiments();
        };
        return F;
    }
};

var hookTemplate = function () {
    var Beverage = function (param) {
        var boilWater = function () {
            console.log('把水煮沸');
        };
        var brew = param.brew || function () {
            throw new Error('必须传递brew方法');
        };
        var pourInCup = param.pourInCup || function () {
            throw new Error('必须传递pourInCup方法');
        };
        var addCondiments = param.addCondiments || function () {
            throw new Error('必须传递addCondiments方法');
        };
        var F = function () {};
        F.prototype.init = function () {
            boilWater();
            brew();
            pourInCup();
            // 添加钩子函数
            if (param.customerWantsCondiments && param.customerWantsCondiments()) {
                addCondiments();

            }
        };
        return F;
    }
};