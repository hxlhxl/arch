/*

定义： 给某一个对象提供一个代理或占位符，并由代理对象来控制对原对象的访问。
分类： 保护代理(保护被代理对象接受不符合条件的数据)、虚拟代理(代替发送方执行某些操作)、缓存代理(为一些开销大的运算结果提供暂时的存储)
实现： 
场景： 图片预加载,缓存分页数据

*/



// 缓存代理：可用于缓存分页数据

var cacheProxy = function() {
    var mult = function() {
        console.log('开始计算乘积');
        var a = 1;
        for (var i=0,l=arguments.length;i<l;i++) {
            a = a * arguments[i];
        }
        return a;
    };
    var proxyMult = (function() {
        var cache = {};

        return function() {
            var args = Array.prototype.join.call(arguments,',');
            if (!cache[args]) {
                // cache[args] = mult(arguments);
                cache[args] = mult.apply(this,arguments);
            }
            return cache[args];
        }
    })()
    proxyMult(1,2,3,4);
    proxyMult(1,2,3,4);
}