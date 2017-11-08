# 说明
Go1.6只有查找PKG的顺序为：
当前包下的vendor目录。
向上级目录查找，直到找到src下的vendor目录。
在GOPATH下面查找依赖包。
在GOROOT目录下查找
所以直接go run main.go优先查找vendor目录
# 安装
go get -u github.com/kardianos/govendor

# 添加依赖
后面的依赖必须在$GOPATH/src下面
govendor add github.com/robfig/cron
govendor fetch github.com/labstack/gommon/color
govendor fetch github.com/labstack/gommon/log
# 列出依赖
govendor list

# 删除依赖
govendor remove [PKG]

