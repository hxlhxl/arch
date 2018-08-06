
# install

```
go get github.com/grafana/grafana
cd $GOPATH/src/github.com/grafana/grafana
go run build.go setup
go run build.go build
```


# build.go源码分析

## go run build.go setup

全局变量
```
var (
	//versionRe = regexp.MustCompile(`-[0-9]{1,3}-g[0-9a-f]{5,10}`)
	goarch  string
	goos    string
	gocc    string
	cgo     bool
	pkgArch string
	version string = "v1"
	// deb & rpm does not support semver so have to handle their version a little differently
	linuxPackageVersion   string = "v1"
	linuxPackageIteration string = ""
	race                  bool
	phjsToRelease         string
	workingDir            string
	includeBuildNumber    bool     = true
	buildNumber           int      = 0
	binaries              []string = []string{"grafana-server", "grafana-cli"}
	isDev                 bool     = false
	enterprise            bool     = false
)
```

log.SetOutput(os.Stdout)
log.SetFlags(0)
ensureGoPath()  检查环境变量GOPATH，如果不存在则以当前路径上的src所在目录为GOPATH
flag.TYPE_VAR(...)  对全局变量作参数设置,用于解析`build.go`的命令行参数

runPrint("go", "get", "-v", "github.com/golang/dep")    `go get -u github.com/golang/dep/cmd/dep`，安装golang dep工具
runPrint("go", "install", "-v", "./pkg/cmd/grafana-server") 安装`grafana-server`,生成$GOPATH/bin/grafana-server可执行文件


## go run build.go build
大部分步骤和setup一样，只有最后build调用的函数不同。build的流程如下：

var (
    binaries              []string = []string{"grafana-server", "grafana-cli"}
)

1. 遍历`binaries`数组，执行`build(binary, "./pkg/cmd" + binary, []string{})`
2. 根据平台构造可执行文件的名称
3. 删除输出位置的原有文件
4. setBuildEnv()，用于设置Go编译要用到的环境变量
5. runPrint("go", "build", args...) 编译程序并生成MD5


# 前端代码

```
yarn install --pure-lockfile
npm run watch   // serve by grafana's webserver
```