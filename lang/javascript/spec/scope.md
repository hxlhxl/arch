



# 动态创建命名空间


```
var MyApp = {};
MyApp.namespace = function(name) {
    var parts = name.split('.');
    var current = this; // 如果使用箭头函数这里就指向了window了。
    for (var i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
}
MyApp.namespace('event');
MyApp.namespace('dom.style');
```