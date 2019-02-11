


function demo1() {
    const ps = Promise.resolve();

    ps.then(
        res => {
            xxx.xxx;
        }
    ).catch(err => {
        console.log(err);
    });
}


function demo2() {
    const ps = Promise.resolve(100);
    ps.then(res => {console.log(res)});
}

function demo3() {
    const ps = Promise.reject(100);
    ps.then(undefined, err => {console.log(err)});
    // ps.catch(err => {console.log(err)});
}


// promise对象的状态，从Pending转换为Fulfilled或Rejected之后， 这个promise对象的状态就不会再发生任何变化。
// 也就是说，Promise与Event等不同，在.then 后执行的函数可以肯定地说只会被调用一次。但是可以对同一个Promise对象多次调用then方法

```
const ps = Promise.resolve(100);
ps.then(res => console.log(res));
ps.then(res => console.log(res));
ps.then(res => console.log(res));
```



# Promise.prototype.then()总是异步的~

```
var promise = new Promise(function (resolve){
    console.log("inner promise"); // 1
    resolve(42);
});
promise.then(function(value){
    console.log(value); // 3
});
console.log("outer promise"); // 2
```



# `then/catch` return的值如果不是Promise类型，都会被Promise.resolve包装;如果是Promise类型的，就按原样返回。而JavaScript中函数默认会返回undefined，所以`.then/.catch`总会返回一个Promise对象，所以就可以一直进行链式调用。

```
const ps = Promise.resolve(100);
ps.then(res => {
    console.log(res);
    return Promise.reject(999);
}).catch(err => {
    console.log(err);
    // return Promise.resolve(200);
    return new Error("200")
}).then(res => {
    console.log(res, 'x');
})
```

```

const ps = Promise.resolve(100);
ps.then(res => {
    console.log(res);
}).then(res => {
    console.log("res above:", res)
})

```













# Anti-Pattern

```
// 这种写法是正确的，但是总感觉怪怪的
function badAsyncCall() {
    var promise = Promise.resolve(100);
    promise.then(function(val) {
        // 任意处理
        return val + 100;
    });
    return promise;
}

badAsyncCall().then(res => console.log(res));




var p = new Promise((res, rej) => {
    res(1);
    rej(2);
    res(3);
  });
  
  p.then(x => console.log('resolved to '+x))
  .catch(x => console.log('never called '+x));
  
  p.then(x => console.log("one more "+ x));
  p.then(x => console.log("two more "+ x));
  p.then(x => console.log("three more "+ x));
  

  
  
function anAsyncCall() {
    var promise = Promise.resolve();
    return promise.then(function() {
        // 任意处理
        return newVar;
    });
}

```



# Promise.all(promiseArray)

接受一个Promise对象构成的数组，返回的一个新的Promise。
当数组中所有Promise实例都处于fulfilled状态， 返回的值也为一个数组，顺序和传入的一致。
如果数组中有一个出现Rejected，则返回值不是数组，而是第一个Reject的值。


```
const ps1 =  Promise.resolve(1);
const ps2 =  Promise.resolve(2);
const ps3 =  Promise.resolve(3);
const ps = Promise.all([ps1, ps2, ps3]);
ps.then(
    res => console.log('fulfilled', res),
    err => console.log('rejected', err)
);
```

```
const ps1 =  Promise.resolve(1);
const ps2 =  Promise.reject(2);
const ps3 =  Promise.reject(3);
const ps = Promise.all([ps1, ps2, ps3]);
ps.then(
    res => console.log('fulfilled', res),
    err => console.log('rejected', err)
);
```


# Promise.race

Promise.race 只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。

```

const timeout = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("请求超时", 2000);
    })
});
const worker = new Promise((resolve, reject) => {
    const request = () => {
        setTimeout(() => {
            resolve("任务完成");
        }, 3000);
    };
    request();
});

Promise.race([timeout, worker]).then(
    res => {
        console.log(res);
    },
    err => {
        console.log(err);
    }
)

```