package main

import (
	"flag"
	"fmt"
	"os"

	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
)

var version = "1.0.0"
var commit = "NA"
var buildstampInt64 int64 = 1235525

func main() {
	v := flag.Bool("v", false, "prints current version and exists")
	// profile := 
	flag.Parse()
	if *v {
		fmt.Printf("Version %s (commit: %s)\n", version, commit)
		os.Exit(0)
	}

	setting.BuildVersion = version
	setting.BuildCommit = commit
	setting.BuildStamp = buildstampInt64
	setting.IsEnterprise = false
	api.RunFakeHttpServer()
}