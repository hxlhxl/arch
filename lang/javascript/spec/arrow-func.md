箭头函数表达式的语法比函数表达式更短，并且不绑定自己的this，arguments，super或 new.target。这些函数表达式最适合用于非方法函数，并且它们不能用作构造函数。

- 引入箭头函数有两个方面的作用：更简短的函数并且不绑定this。
- 箭头功能不会创建自己的this；它使用封闭执行上下文的this值。
- 由于 this 已经在词法层面完成了绑定，通过 call() 或 apply() 方法调用一个函数时，只是传入了参数而已。
- 不绑定arguments，可使用rest paraments作为补充

```
'use strict';
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log( this.i, this)
  }
}
obj.b(); 
// undefined,Window{...}
obj.c(); 
// 10, Object {...}
```
