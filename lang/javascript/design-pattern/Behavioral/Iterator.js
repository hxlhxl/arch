import _ from "lodash"

/*
$.each([1,2,3],function(i,n) {
});

分类： 内部迭代器、外部迭代器
场景： 遍历判断使用迭代器构造优先级
*/

// 内部迭代器
var each = function (obj, callback) {
    var value,
        i = 0,
        length = obj.length,
        isArray = _.isArrayLike(obj);

    if (isArray) {
        for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {  // 如果callback执行结果中返回false，则终止迭代器
                break;
            }
        }
    } else {
        for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
                break;
            }
        }
    }
    return obj;
}