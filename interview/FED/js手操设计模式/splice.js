
// arrayObject.splice(index,howmany,item1,...,itemX)

var arr = ['a','b','c'];
var r;


// 增加,
r = arr.splice(3,0,'d');	// 在index为3的地方插入'd'
console.log(r,arr);

// 修改
r = arr.splice(3,1,'x');
console.log(r,arr);

// 删除
r = arr.splice(0,4);
console.log(r,arr);
