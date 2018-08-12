


# generator

## yield next

yield本身没有返回值，next添加一个参数作为 上一个yield的返回值

```
function* gf(x) {
    let y = 2 * (yield (x + 1));
    let z = yield(y / 3);
    return (x + y + z);
};
const g = gf(5);
a = g.next();
b = g.next(12);
c = g.next(13);
console.log(a,b,c);
```

## for of

next调用后的返回值中done为true时，终止for of循环

## Generator.prototype.throw()

```
var g = function* () {
  try {
    yield;
  } catch (e) {
    console.log('内部捕获', e);
  }
};

var i = g();
i.next();

try {
  i.throw('a');
  i.throw('b');
} catch (e) {
  console.log('外部捕获', e);
}
// throw抛出两次异常，一次generator内部捕获，一次generator外部捕获。
// 内部捕获 a
// 外部捕获 b
```

## Generator.prototype.return()


```
function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

var g = gen();

g.next()        // { value: 1, done: false }
g.return('foo') // { value: "foo", done: true }
g.next()        // { value: undefined, done: true }

```


## generator this

一般情况下，this没有指向。




# asynchornous

## callback
解决异步的一种方案
## Promise
优雅的解决回调地狱
## generator



# thunk


```
function f(m) {
  return m * 2;
}

f(x + 5);

// 等同于

var thunk = function () {
  return x + 5;
};

function f(thunk) {
  return thunk() * 2;
}
```


## es6 thunk

```
const Thunk = function(fn) {
  return function (...args) {
    return function (callback) {
      return fn.call(this, ...args, callback);
    }
  };
};
```




# async await

generator的语法糖

