package main

import (
	"flag"
	"fmt"
	"os"
	"time"
	"strconv"

	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
)

var version = "1.0.0"
var commit = "NA"
var buildstamp string

func main() {
	v := flag.Bool("v", false, "prints current version and exists")
	// profile := 
	flag.Parse()
	if *v {
		fmt.Printf("Version %s (commit: %s)\n", version, commit)
		os.Exit(0)
	}

	buildstampInt64, _ := strconv.ParseInt(buildstamp, 10, 64)
	if buildstampInt64 == 0 {
		buildstampInt64 = time.Now().Unix()
	}
	setting.BuildVersion = version
	setting.BuildCommit = commit
	setting.BuildStamp = buildstampInt64
	setting.IsEnterprise = false


	api.RunFakeHttpServer()
}