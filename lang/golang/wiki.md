
# 列出所有package
cd $GOPATH
go list ...



# Trick

1. `go build`与`go install`的区别
    `go build`只对`main`包有作用,用于生成可执行文件；`go install`对所有包都起作用，主要用于把生成的文件放到`pkg`或者`bin`下面。

2. `go build -race`的作用
   [Race检测](https://www.cnblogs.com/yjf512/p/5144211.html)，在编译阶段检测go routine可能存在竟态

3. `go build -ldflags`的作用
   [ldflags](https://studygolang.com/articles/9422)，在编译阶段，设置程序中变量的值，相当于Webpack的DefinePlugin
4. 