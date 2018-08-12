// 外观模式
// 主要用于大型架构中，客户端调用各个子模块时，由于子模块错综复杂，使用facade包装后只可以看到facade暴露的接口，其中的逻辑被子模块组合实现。降低系统的复杂度。

// 和适配器模式样子类似，一个比较好的例子是调用各种sdk时使用或者大型架构中使用

var module=(function(){
    var _private={
      i:5,
      get:function(){
        console.log('current value:' + this.i);
      },
      set:function(val){
        this.i=val;
      },
      run:function(){
        console.log('running');
      },
      jump:function(){
        console.log('jumping');
      }
    };
    return{
      facade:function(args){
        _private.set(args.val);
        _private.get();
        if (args.run) {
          _private.run();
        }
      }
    }
  }());
  module.facade({run:true,val:10});

