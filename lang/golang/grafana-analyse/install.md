
# install

```
go get github.com/grafana/grafana
cd $GOPATH/src/github.com/grafana/grafana
go run build.go setup
go run build.go build
```


# build.go源码分析

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
flag.TYPE_VAR(...)  对全局变量作参数设置