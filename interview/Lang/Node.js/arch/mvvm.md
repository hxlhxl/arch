# mvc
Model-View-Controller

# mvvm  Model-View-ViewModel

在前端页面，把Model用纯JavaScript对象表示，View负责显示，二者之间的沟通协调就是通过ViewModel。
ViewModel负责把Model数据同步到View上，还负责把View上的数据修改同步回Model。
通过mvvm框架，开发者更多的关注如何修改Model中的JavaScript对象，从而避免繁琐的DOM操作。


## 单项绑定

Model绑定到View上，修改Model的时候，View就会变化。

## 双向绑定

Model和View之间的修改是双向的，Model变化View变化，View变化Model也发生变化。

ref: 而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。

