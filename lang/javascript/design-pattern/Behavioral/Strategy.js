/*

定义： 定义一系列的规则，把他们封装起来，并且使他们可以相互替换
实现： 隔离策略类与使用类
场景： 表单校验(多种校验规则作为策略)
*/


var stragegies = {
    s1: function (fn) {},
    s2: function (fn) {},
    s3: function (fn) {},
};

// action的封装按照实际需求编写
var action = function () {};

var init = function (stragegy, context) {
    stragegies[stragegy](context)
}

init(s1, action)