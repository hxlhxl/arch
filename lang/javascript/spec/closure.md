# 作用

- 封装私有变量

```
var user = (function(){
    var __name = 'sven',
            __age = 29;
    return {
        getUserInfo: function() {
            return __name + '-' + age;
        }
    }
})()
```

- 


# 内存泄露？




