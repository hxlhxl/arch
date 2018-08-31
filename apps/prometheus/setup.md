
# server安装

```
go get github.com/prometheus/prometheus/cmd/...
cd $GOPATH/src/github.com/prometheus/prometheus
make build
prometheus --config.file="document/example/prometheus.yml"
```


# export安装

## node_export

```
go get github.com/prometheus/node_exporter
cd $GOPATH/src/github.com/prometheus/node_exporter
make

```