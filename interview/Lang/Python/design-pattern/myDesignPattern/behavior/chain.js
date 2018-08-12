
order500 = function(orderType,pay,stock) {
    if (orderType === 1 && pay === true) {
        console.log('500元定金预定，得到100优惠券');
    } else {
        return 'nextSuccessor';
    }
}

order200 = function(orderType,pay,stock) {
    if (orderType === 2 && pay === true) {
        console.log('200元定金预定，得到50优惠券');
    } else {
        return 'nextSuccessor';
    }
}

orderNormal = function(orderType,pay,stock) {
    if (stock > 0) {
        console.log('普通购买，无优惠券');
    } else {
        console.log('手机库存不足');
    }
}


Function.prototype.after = function(fn) {
    var self = this;

    return function() {
        var ret = self.apply(this,arguments);
        if (ret === 'nextSuccessor') {
            return fn.apply(this,arguments)
        }
        return ret;
    }
}

order = order500.after(order200).after(orderNormal);

order(2,true,500);