package api

import (
	"fmt"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"

)


func RunFakeHttpServer() {
	fmt.Println("server started...")
	fmt.Println("Server version is", setting.BuildVersion)
	fmt.Println("Server build stamp is", setting.BuildStamp)
	fmt.Println("Server build stamp is", setting.BuildStamp)
}