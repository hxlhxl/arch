package api

import (
	"fmt"
	"context"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/registry"
	macaron "gopkg.in/macaron.v1"

)


func init() {
	registry.Register(&registry.Descriptor{
		Name:			"HTTPServer",
		Instance:		&HTTPServer{},
		InitPriority:	registry.High,
	})
}

type HTTPServer struct {
	log				log.Logger
	macaron			*macaron.Macaron
	context			context.Context
	streamManager	*live.StreamManager
	cache			*gocache.Cache
	httpSrv			*http.Server

	RouteRegister	routing.RouteRegister	`inject:""`
	Bus				bus.Bus					`inject:""`
	RenderService	rendering.Service		`inject:""`
	Cfg				*setting.Cfg			`inject:""`
}
func RunFakeHttpServer() {
	fmt.Println("RunFakeHttpServer\nServer build stamp is", setting.BuildStamp)
}