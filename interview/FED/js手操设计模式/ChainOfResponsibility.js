// 使多个对象都有机会处理请求，从而避免请求的发送者和接受者之间的耦合关系，将这些对象构成一条链子，并沿着这条链传递请求



// functional
Function.prototype.after = function() {
    var self = this;
    return function() {
        var ret = self.apply(this,arguments);
        if (ret === 'nextSuccessor') {
            return fn.apply(this,arguments);
        }
        return ret;
    };
}



var order500 = function(orderType,pay,stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预购，得到100优惠券');
    } else {
        return 'nextSuccessor';
    }
};
var order200 = function(orderType,pay,stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预购，得到50优惠券');
    } else {
        return 'nextSuccessor';
    }
}
var orderNormal = function(orderType,pay,stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
}

var Chain = function(fn) {
    this.fn = fn;
    this.successor = null;
};
Chain.prototype.setNextSuccessor = function(successor) {
    return this.successor = successor;
};
Chain.prototype.passRequest = function() {
    var ret = this.fn.apply(this,arguments);
    if (ret === 'nextSuccessor') {
        return this.successor && this.successor.passRequest.apply(this.successor,arguments);
    }
    return ret;
}

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrdeNormal = new Chain(ordeNormal);

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrdeNormal);

// ->
chainOrder500.setNextSuccessor(chainOrder200).setNextSuccessor(chainOrdeNormal);


chainOrder500.passRequest(1,true,500);


