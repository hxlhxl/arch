
# 构造器函数
JS中的构造器函数如果默认没有return值的话，那么构造器默认会return this;
如果显示return，但是不是一个对象，结果仍然为this;
如果显示return，而且是一个对象，那么结果就是这个对象了。

```
function Person(name,age) {
    this.name = name;
    this.age = age;
    this.getName = function() {
        // 对象实例上的属性，优先调用
        return 'my name is:' + this.name;
    }
}
// 对象原型上的属性
Person.prototype.getName = function () {
    return this.name;
}
```
