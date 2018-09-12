# 模块
每个js文件都是一个模块。
require()引入的是module.exports
在js文件中对module.exports重新赋值会导致exports失效，在exports上的属性不会导出
在js文件中对exports重新赋值，会导致之后的exports上的属性不会导出
综上，最稳妥的做法是`exports = module.exports = myMoudle`
## export shortcut

```
module = {};
module.exports = {};
exports = module.exports;
exports.a = 1;
exports = {a: 'aa'};
```