// 浏览器本身内置一种发布订阅的模式： 添加、删除事件
// element.addEventListener(event,function,useCapture)
//
//
// 场景： 
//   1. 自定义事件
//   2. 网站登录
//      在网站登录成功之后，一些dom都需要改变，那么一般的逻辑就是登录成功之后，分别调用不同的dom的绑定事件
//      使用发布订阅模式，login模块在登入时trigger "loginSucc"事件，其他的header、nav等模块订阅了"loginSucc"事件，自然就会发生改变。
//   3.模块间通信(全局Event对象)
var a = (function() {
  var count = 0;
  var button = document.getElementById('count');
  button.onclick = function() {
    Event.trigger('add',count++);
  }
})();
var b = (function() {
  var div = document.getElementById('show');
  Event.listen('add',function(count) {
    div.innerHTML = count;
  })
})()
//
//
// 题目(观察者模式搞定)： 自定义一个Event对象，Event.on('click',fn),Event.del('click')且不影响当前正在执行的事件,Event.emit('click','arguments')
//
//
//
//
// 题目(发布-订阅通用实现)
//
var event = {
  clientList: {},
  listen: function(key,fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  trigger: function() {
    var key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
    if (!fns || fn.length === 0) {
      return false;
    }
    for (var i=0,fn;fn=fns[i++];) {
      fn.apply(this,arguments);
    }
  },
  remove: function(key,fn) {
    var fns = this.clientList[key];
    if (!fns) {
      return false;
    }
    if (!fn) {
      fns && (fns.length = 0);
    } else {
      for (var l = fns.length - 1;l>=0;l--) {
        var _fn = fns[l];
        if (_fn === fn) {
          fns.splice(l,1);
        }
      }
    }
  }
};

var installEvent = function(obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
};

var salesOffice = {};
installEvent(salesOffice);
salesOffice.listen();
salesOffice.trigger();













