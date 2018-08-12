
# js模块化演变

[Javascript模块化编程（一）：模块的写法](http://www.ruanyifeng.com/blog/2012/10/javascript_module.html)
[Javascript模块化编程（二）：AMD规范](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)
[AMD spec](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
[Javascript模块化编程（三）：require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

## 没有规范之前

``` v1
function f1() {}
// ...
function f2() {}
```

``` v2
var module = {
    v1: 0,
    f1: function() {},
    f2: function() {}
}
```

``` v3

var module = (function() {
    v1 = 0;
    function f1() {alert(v1++)};
    function f2() {};

    return {
        f1,f2
    };
})()

```


``` v4
var module = (function(dep) {
    v1 = 0;
    function f1() {alert(v1++)};
    function f2() {};

    dep.moduleB = {
        f1,f2
    };
    return dep;
})(moduleA)
```

``` v5

var module = (function(dep) {
    v1 = 0;
    function f1() {alert(v1++)};
    function f2() {};

    dep.moduleB = {
        f1,f2
    };
    return dep;
})(window.moduleA || {})

```


## CMD

## AMD 异步加载

```
 define(id?, dependencies?, factory);

```
- id
    String 该模块ID
- dependencies
    Array 该模块依赖，依赖解析后按照位置作为参数传递给factory
- factory
    Function | Object 模块定义


# requirejs

实现的只要原理

0. 引入requirejs，其中定义了require和define
1. 定义main入口
2. 所以依赖的模块都通过docuemnt.createElement('script')动态插入DOM中
3. 2中引入的js文件都会有依赖，这些依赖通过一个modules对象记录其信息，这些信息不包括： 
    id： js文件
    state： 状态
    deps： require或者define中定义的依赖数组
    callback： require或者define中的回调函数
    exports： null 模块的输出，作为其他模块的依赖
    color： 0
4. loadings数组记录正在加载的模块id
5. 不管是require还是define都只是定义了各个模块的依赖
6. 每次调用loadJs的时候，都会创建script标签，然后对标签中的资源进行依赖解析，每次解析之时都要检查各种依赖是否满足。
7. 当依赖满足之后，就调用callback，并把callback作为exports，最后会把exports作为参数传递给其他模块的回调函数。


