# golang spec

[go spec](https://golang.org/ref/spec)
[go memory model](https://golang.org/ref/mem)
# 特性
- 静态语言
- 垃圾回收
- 并发
- 网络
  
# 安装
```
$ sudo pacman -S go
```

## 配置
- go1.8之前需要配置环境变量GOPATH
- 可以允许多个GOPATH，默认会把go get的内容放到第一个目录中
- GOPATH下面默认有三个子目录： src(源代码), pkg(编译后生成的文件), bin(编译后生成的可执行文件,可以加入到$PATH中方便系统执行)
- GOPATH/src是开发用户程序的主要目录，所有的源码都放在这个下面，一般一个目录就是一个项目，src之后的路径就是包路径，比如`github.com/astaxie/beedb`，包名称是`beedb`
- GOBIN也要设置，否则会报错`o install: no install location for /home/husa/workspace/goland/src/app: hidden by /home/husa/go/src/app`


``` .bashrc
export GOPATH=~/go:~/workspace/goland
export GOBIN=~/workspace/goland/bin
```

## Demo
`~/workspace/goland`


## 安装依赖、第三方lib

```
$ go get github.com/grafana/grafana
```

go get的本质可以理解为第一步通过源码工具clone代码到src下面，然后执行`go install`

## go CLI

- go build编译代码。在包的编译过程中，若有必要，会同时编译与之相关联的包
- go clean移除当前源码包和关联源码包里面编译生成的文件
- go fmt强制了代码格式
- gofmt -w -l src格式化整个项目
- go get动态获取远程代码包的，目前支持的有BitBucket、GitHub、Google Code和Launchpad。
- go install第一步是生成结果文件(可执行文件或者.a包)，第二步会把编译好的结果移到`$GOPATH/pkg`或者`$GOPATH/bin`。
- go test执行这个命令，会自动读取源码目录下面名为`*_test.go`的文件，生成并运行测试用的可执行文件
- go generate
- godoc需要这样安装`go get golang.org/x/tools/cmd/godoc`
- go version
- go env
- go list列出当前全部安装的package
- go run编译并运行Go程序

## go IDE

- LiteIDE
- Sublime Text
- Vs code



# Go语言基础

- package
- var variableName type
- bool, int, int32, float32, float64, string, errors, ioat,
- 默认规则：1. 大写字母开头的变量可以到处，也就是其他包可以读取，是公有变量；小写字母开头不可导出，是私有变量2. 大写字母开头的函数也是可以导出的，相当于class中的带public关键词的公有函数；小写字母开头的就是private关键词的私有函数
- 同一个包内的所有变量、类型、接口可以相互访问，不需要大写字母开头，大写字母是暴露给其他包的
- array, slice(动态数组), map： 1. 数组作为参数传递给函数是按值传递而不是数组的引用 2. slice是引用类型，所以当引用改变其中元素的值时，其他所有的引用都会改变该值。slice像一个结构体，包含一个指针，长度和最大长度，最大长度可以用数组的切片计算出来，及最开始位置到数组的最后位置。3. map无序，map是引用类型，不是thread-safe，在多个go-routine中存取时，必须使用mutex lock机制
- len, cap, append, copy
- make, new: 1. make用于内建类型map, slice和channel的内存分配 2. new用于各种类型的内存分配。 new(T)分配了零值填充的T类型的内存空间，并且返回其地址，即一个*T类型，即返回了一个指针，指向新分配的类型T的零值。 make(T, args)只能用于内建类型。 3. make(T, 0)的作用在于append的时候不用管默认的跟踪索引特性 (https://www.calhoun.io/how-to-use-slice-capacity-and-length-in-go/)
    ```
    // vals := make([]int, 5) -> len: 5, capacity: 5
    // vals = append(vals, 1)  -> capacity在gi中会自动扩充，一般是当前的两倍
    // slices := make([]int, 0) -> len: 0, capacity: 0,此时使用append，slice的length会一个一个增加，那么就会正常了
    package main

    import (
        "fmt"
    )

    func main() {
        vals := make([]int, 5)   
        for i := 0; i< 5; i++ {   
            vals = append(vals, i) 
            fmt.Println(len(vals))
        } 
        fmt.Println(vals)  
    }

    ```
- delete可以删除map的元素: delete(mapVar, key)
- 结构体
  声明：
  初始化： 
        ```
        type logger struct {
            level int
        }
        var Root *logger    // Root == nil
        var MyRoot *logger = &logger{}  // MyRoot -> &logger{level 0;}
        ```

## package
- package main表示这个包将会生成可执行文件，其他的包则会生成.a文件
- 包名和包所在的文件夹名可以是不同的

## variable

```
var variableName type = value
var vname1, vname2, vname3 type = v1, v2, v3
var vname1, vname2, vname3 = v1, v2, v3
vname1, vname2, vname3 := v1, v2, v3 // 自动推导，智能用在函数内部；一般使用var定义全局变量
_, b := 34, 35  // _变量名会自动舍弃赋予的值
const Pi = 3.1415925
const prefix = "antd_"
const (
    i = 100
    pi = 3.1415
    prefix = "Go_"
)

var(
    i int
    pi float32
    prefix string
)
var arr [10]int
arr[0] = 42
arr[1] = 43
a := [3]int{1, 2, 3}
b := [10]int{1, 2, 3}
c := [...]int{4, 5, 6}

doubleArray := [2][4]int{[4]int{1, 2, 3, 4}, [4]int{5, 6, 7, 8}}
easyArray := [2][4]int{{1, 2, 3, 4}, {5, 6, 7, 8}}

var fslice []int

slice := []byte {'a', 'b', 'c', 'd'}

var ar = [10]byte {'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'}
var a, b []byte
a = ar[2:5]
b = ar[3:5]
a[:n] <=> a[0:n]
a[n:] <=> a[n:len(a)]
a[:]


var numbers map[string]int
numbers = make(map[string]int)
numbers["one"] = 1
numbers["two"] = 2
numbers["three"] = 3
rating := map[string]float32{"C":5, "Go":4.5, "Python":4.5, "C++":2 }
```





## 内置基础类型

## 流程控制

- if: 1. 不许要括号， 2. 可以声明变量
- goto: 
```
func myFunc() {
    i := 0
Here:
    println(i)
    i++
    goto Here
}
```
- for: 1. 循环 2. while 3. 迭代
```
for expression1; expression2; expression3 {}
// expression1和expression3是变量声明或者函数返回值之类的
// expression2是用来条件判断
// 省略expression1,expression就是while的功能
```

```
for index:=0; index < 10; index++ {
    sum += index
    // i, j = i+1, j-1
}
```

```
sum := 1
for ; sum < 1000; {
    sum += sum
}
```

```
sum := 1
for sum < 1000 {
    sum += sum
}
```
- break,continue
- _用于丢弃不需要的变量
- switch语句，不需要break，拥有特殊的fallthrough
- select语句
    ```
        Select {
            case u := <- ch1:
            case e := <- ch2:
            default:
        }
    ```
## 函数
函数是Go里面的核心设计，它通过关键字`func`来声明，它的格式如下：
```Go

func funcName(input1 type1, input2 type2) (output1 type1, output2 type2) {
	//这里是处理逻辑代码
	//返回多个值
	return value1, value2
}
```
上面的代码我们看出

- 关键字`func`用来声明一个函数`funcName`
- 函数可以有一个或者多个参数，每个参数后面带有类型，通过`,`分隔
- 函数可以返回多个值
- 上面返回值声明了两个变量`output1`和`output2`，如果你不想声明也可以，直接就两个类型
- 如果只有一个返回值且不声明返回值变量，那么你可以省略 包括返回值 的括号
- 如果没有返回值，那么就直接省略最后的返回信息
- 如果有返回值， 那么必须在函数的外层添加return语句
- Go函数支持变参。接受变参的函数是有着不定数量的参数的。为了做到这点，首先需要定义函数使其接受变参
```Go

func myfunc(arg ...int) {}
```
    `arg ...int`告诉Go这个函数接受不定数量的参数。注意，这些参数的类型全部是`int`。在函数体中，变量`arg`是一个`int`的`slice`：

### 函数传参

- 值传递
- 地址传递(指针),和C++类似
- Go语言中`channel`，`slice`，`map`这三种类型的实现机制类似指针，所以可以直接传递，而不用取地址后传递指针。（注：若函数需改变`slice`的长度，则仍需要取地址传递指针）

### defer

- 后进先出

### 函数作为值、类型
在Go中函数也是一种变量，我们可以通过`type`来定义它，它的类型就是所有拥有相同的参数，相同的返回值的一种类型

	type typeName func(input1 inputType1 , input2 inputType2 [, ...]) (result1 resultType1 [, ...])

### Panic和Recover

Go没有像Java那样的异常机制，它不能抛出异常，而是使用了`panic`和`recover`机制。一定要记住，你应当把它作为最后的手段来使用，也就是说，你的代码中应当没有，或者很少有`panic`的东西。这是个强大的工具，请明智地使用它。那么，我们应该如何使用它呢？

### `main`函数和`init`函数

Go里面有两个保留的函数：`init`函数（能够应用于所有的`package`）和`main`函数（只能应用于`package main`）。这两个函数在定义时不能有任何的参数和返回值。虽然一个`package`里面可以写任意多个`init`函数，但这无论是对于可读性还是以后的可维护性来说，我们都强烈建议用户在一个`package`中每个文件只写一个`init`函数。

Go程序会自动调用`init()`和`main()`，所以你不需要在任何地方调用这两个函数。每个`package`中的`init`函数都是可选的，但`package main`就必须包含一个`main`函数。

程序的初始化和执行都起始于`main`包。如果`main`包还导入了其它的包，那么就会在编译时将它们依次导入。有时一个包会被多个包同时导入，那么它只会被导入一次（例如很多包可能都会用到`fmt`包，但它只会被导入一次，因为没有必要导入多次）。当一个包被导入时，如果该包还导入了其它的包，那么会先将其它包导入进来，然后再对这些包中的包级常量和变量进行初始化，接着执行`init`函数（如果有的话），依次类推。等所有被导入的包都加载完毕了，就会开始对`main`包中的包级常量和变量进行初始化，然后执行`main`包中的`init`函数（如果存在的话），最后执行`main`函数。

## import

我们在写Go代码的时候经常用到import这个命令用来导入包文件，而我们经常看到的方式参考如下：
```Go

import(
    "fmt"
)
```
然后我们代码里面可以通过如下的方式调用
```Go

fmt.Println("hello world")
```
上面这个fmt是Go语言的标准库，其实是去`GOROOT`环境变量指定目录下去加载该模块，当然Go的import还支持如下两种方式来加载自己写的模块：

1. 相对路径

	import “./model” //当前文件同一目录的model目录，但是不建议这种方式来import

2. 绝对路径

	import “shorturl/model” //加载gopath/src/shorturl/model模块
	
	
上面展示了一些import常用的几种方式，但是还有一些特殊的import，让很多新手很费解，下面我们来一一讲解一下到底是怎么一回事
	
	
1. 点操作
	
	我们有时候会看到如下的方式导入包
	
		import(
		    . "fmt"
		)
	
	这个点操作的含义就是这个包导入之后在你调用这个包的函数时，你可以省略前缀的包名，也就是前面你调用的fmt.Println("hello world")可以省略的写成Println("hello world")

2. 别名操作

	别名操作顾名思义我们可以把包命名成另一个我们用起来容易记忆的名字
	
		import(
		    f "fmt"
		)
		
	别名操作的话调用包函数时前缀变成了我们的前缀，即f.Println("hello world")

3. _操作

	这个操作经常是让很多人费解的一个操作符，请看下面这个import
```Go

	import (
	    "database/sql"
	    _ "github.com/ziutek/mymysql/godrv"
	)
```	
	_操作其实是引入该包，而不直接使用包里面的函数，而是调用了该包里面的init函数。


## struct类型

- 例子
```
struct person {
    name string
    age int
}

var P person

P.name = "Astaxie"
P.age = 25
fmt.Printf("The person's name is %s", P.name)

P := person{"Tom", 25}
P := person{age:24, name: "Tome"}
P := new(person)

```

- struct匿名字段 1. 实现字段的继承 2. 内置类型也可以作为匿名字段 3. 就近原则可以是重载继承的字段，访问被覆盖的可以直接使用匿名字段访问，即Mark.Human.phone这样子

```
type Human struct {
    name string
    age int
    weight int
}
type Student struct {
    Human   // 匿名字段，那么默认Student就包含了Human的所有字段
    speciality string
}

mark := Student{Human{"Mark", 25, 120}, "Computer Science"}

```


## 面向对象

- method    1. func后面增加了一个`receiver`，即`method`的主体(`a method is a function with an implicit first argument, called a receiver`) 2. receiver可以为指针，也可以按值传递，和C++中的成员函数后面是否加`const`类似 2. 在使用指针receiver的时候，Golang会自动作指针类型转换，无须向C++那样复杂 3. 继承的匿名字段的method也是可以继承的 4. 继承的类型可以重写匿名字段的method

```
func (r ReceiverType) funcName(parameters) (results)
```

- 自定义类型

```
type typeName typeLiteral

type money float32
type months map[string]int
```


## interface

- interface是一组method签名的集合
- interface可以被任意的对象实现
- 一个对象可以实现任意多个interface
- 任意的类型都实现了空interface(interface {}, 包含0个method的interface)
- interface{}作为函数参数
- interface{}实现了struct一样的继承关系


```
// _Interfaces_ are named collections of method
// signatures.

package main

import "fmt"
import "math"

// Here's a basic interface for geometric shapes.
type geometry interface {
    area() float64
    perim() float64
}

// For our example we'll implement this interface on
// `rect` and `circle` types.
type rect struct {
    width, height float64
}
type circle struct {
    radius float64
}

// To implement an interface in Go, we just need to
// implement all the methods in the interface. Here we
// implement `geometry` on `rect`s.
func (r rect) area() float64 {
    return r.width * r.height
}
func (r rect) perim() float64 {
    return 2*r.width + 2*r.height
}

// The implementation for `circle`s.
func (c circle) area() float64 {
    return math.Pi * c.radius * c.radius
}
func (c circle) perim() float64 {
    return 2 * math.Pi * c.radius
}

// If a variable has an interface type, then we can call
// methods that are in the named interface. Here's a
// generic `measure` function taking advantage of this
// to work on any `geometry`.
func measure(g geometry) {
    fmt.Println(g)
    fmt.Println(g.area())
    fmt.Println(g.perim())
}

func main() {
    r := rect{width: 3, height: 4}
    c := circle{radius: 5}

    // The `circle` and `rect` struct types both
    // implement the `geometry` interface so we can use
    // instances of
    // these structs as arguments to `measure`.
    measure(r)
    measure(c)
}


```

## 断言

- comma-ok value, ok = element.(T)
- switch

## 反射reflection

## goroutine