# 模块
每个js文件都是一个模块。
require()引入的是module.exports
在js文件中对module.exports重新赋值会导致exports失效，在exports上的属性不会导出
在js文件中对exports重新赋值，会导致之后的exports上的属性不会导出
综上，最稳妥的做法是`exports = module.exports = myMoudle`
最经典的就是mongoose的用法: `var mongoose = module.exports = exports = new Mongoose;`,直接导出Mongoose实例
## export shortcut

```
module = {};
module.exports = {};
exports = module.exports;
exports.a = 1;
exports = {a: 'aa'};
```

## require()
require一个模块的时候，系统会缓存该模块的导出
如果module.exports导出了一个类的实例，那么项目中引入的地方都是相同的实例. (https://stackoverflow.com/questions/32588854/how-require-works-when-requiring-the-same-module-in-node-js)

