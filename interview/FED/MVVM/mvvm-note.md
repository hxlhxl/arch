

# mvvm.js

1. 数据代理

把vm中的data属性通过defineProperty代理起来，使用getter和setter可以改变Model中的数据。


2. 监听数据(observer.js)

对Model中date的每个k、v对上使用defineProperty，getter返回data中的数据；setter当data变化的时候，会调用dep.notify()，通知Model变化的订阅者。


# compile.js

1. 节点编译

会对每一个DOM节点进行编译，按照不同的类型bind不同的行为


2. 添加订阅

在每个bind中，都会new Watcher，这个过程中会添加订阅者。当vm.key = value的时候，就会出发dep.notify遍历通知所有订阅者。订阅者就会重新获取数据更新View。
