
# const
const定义的变量不可修改，而且必须初始化。

# var
var生命的变量要么是全局的，要么是函数级别的。无法构造块级作用域。

# let
块级作用域。
- 在块级作用域重复使用let声明变量报错： TypeError
- 在块级作用域提前使用let声明的变量报错： ReferenceError，只能在let声明之后使用。


```
divs = document.getElementsByTagName("div");
      for (var i = 0,len = divs.length;i < len;i++) {
              divs[i].onclick = function() {
          // console.log(i);
          alert(i)
        }
      }
      // let 关键字的用法是正确的。
      for (let i in divs) {
        divs[i].onclick = function() {
          alert(i);
        }
      }
```

两段代码不同之处在于使用var时，回调行数的变量i的作用域是函数级别，最终都会指向同一个变量i，所以会是div的总个数。使用闭包能够修正该错误。
而使用let之后，函数中的i的作用域是块级别，也就是每个i都不一样，所以能够正常。
