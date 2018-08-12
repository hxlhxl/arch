// 观察者模式
// 观察者模式是一个一对多的关系，让多个观察者同时监听一个对象，当这个对象发生了变化时，它会广播给监听它的观察者。使他们自动更新。
(function () {
    var o = $({});
    $.jianting = function () {
        o.on.apply(o, arguments);
    }
    $.tongzhi = function () {
        o.trigger.apply(o, arguments);
    }

    $.shanchu = function () {
        o.off.apply(o, arguments);
    }

})()

$.jianting("频道", function (e, a, b) {
    alert(a + b)
})
$.jianting("频道", function (e, a, b) {
    alert(a - b)
})
setTimeout(function () {
    $.tongzhi("频道", [1, 2]);
}, 1000)