/*

把一系列可以处理请求的对象链接起来组成一条链路，请求在这些对象之间依次传递，这种模式可以理解对if-else分支的形式。

*/


var solution = {
    one: function() {
        var order500 = function(orderType,pay,stock) {
            if (orderType === 1 && pay === true) {
                console.log('500元定金预购，得到100优惠券');
            } else {
                return 'nextSuccessor';
            }
        }
        
        var order200 = function(orderType,pay,stock) {
            if (orderType === 2 && pay === true) {
                console.log('200元定金预购，得到50优惠券');
            } else {
                return 'nextSuccessor';
            }
        }
        
        var orderNormal = function(orderType,pay,stock) {
            if (stock > 0) {
                console.log('普通购买，无优惠');
            } else {
                console.log('手机库存不足');
            }
        };
        
        
        var Chain = function(fn) {
            this.fn = fn;
            this.successor = null;
        };
        Chain.prototype.setNextSuccessor = function(successor) {
            return this.successor = successor;
        };
        Chian.prototype.passRequest = function() {
            var ret = this.fn.apply(this,arguments);
            if (ret === 'nextSuccessor') {
                return this.successor && this.successor.passRequest.apply(this.successor,arguments);
            }
            return ret;
        }
        
        var chainOrder500 = new Chain(order500);
        var chainOrder200 = new Chain(order200);
        var chainOrderNormal = new Chain(orderNormal);
        
        chainOrder500.setNextSuccessor(chainOrder200);
        chainOrder200.setNextSuccessor(chainOrderNormal);
        
        chainOrder500.passRequest(1,true,500);
        chainOrder500.passRequest(2,true,500);
        chainOrder500.passRequest(3,true,500);
    },
    two: function() {
        var order500 = function(orderType,pay,stock) {
            if (orderType === 1 && pay === true) {
                console.log('500元定金预购，得到100优惠券');
            } else {
                return 'nextSuccessor';
            }
        }
        
        var order200 = function(orderType,pay,stock) {
            if (orderType === 2 && pay === true) {
                console.log('200元定金预购，得到50优惠券');
            } else {
                return 'nextSuccessor';
            }
        }
        
        var orderNormal = function(orderType,pay,stock) {
            if (stock > 0) {
                console.log('普通购买，无优惠');
            } else {
                console.log('手机库存不足');
            }
        };
        Function.prototype.after = function(fn) {
            var self = this;    // 前函数对象，fn后函数对象
            return function() {
                var ret = self.apply(this,arguments);   // 前面的结果
                if (ret === 'nextSuccessor') {
                    return fn.apply(this,arguments);    // 后面的结果
                }
                return ret;
            }
        };

        var order = order500.after(order200).after(orderNormal);
        order(1,true,500);
        order(2,true,500);
        order(3,true,500);
    }
}

