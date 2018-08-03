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
- array, slice(动态数组), map： 1. 数组作为参数传递给函数是按值传递而不是数组的引用 2. slice是引用类型，所以当引用改变其中元素的值时，其他所有的引用都会改变该值。slice像一个结构体，包含一个指针，长度和最大长度，最大长度可以用数组的切片计算出来，及最开始位置到数组的最后位置。3. map无序，map是引用类型，不是thread-safe，在多个go-routine中存取时，必须使用mutex lock机制
- len, cap, append, copy
- make, new: 1. make用于内建类型map, slice和channel的内存分配 2. new用于各种类型的内存分配。 new(T)分配了零值填充的T类型的内存空间，并且返回其地址，即一个*T类型，即返回了一个指针，指向新分配的类型T的零值。 make(T, args)只能用于内建类型。
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

