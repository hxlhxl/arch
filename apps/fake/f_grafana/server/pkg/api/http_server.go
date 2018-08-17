package api

import (
	"fmt"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"

)


func RunFakeHttpServer() {
	fmt.Println("RunFakeHttpServer\nServer build stamp is", setting.BuildStamp)
}