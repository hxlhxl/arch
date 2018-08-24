package api

import (
	"fmt"
	"time"
	"context"
	"net/http"
	
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api/routing"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/registry"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/bus"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api/live"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/services/rendering"
	
	gocache "github.com/patrickmn/go-cache"
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

func (hs *HTTPServer) Init() error {
	hs.log = log.New("http.server")
	hs.cache = gocache.New(5*time.Minute, 10*time.Minute)

	hs.streamManager = live.NewStreamManager()
	hs.macaron = hs.newMacaron()
	hs.registerRoutes()

	return nil
}

func (hs *HTTPServer) newMacaron() *macaron.Macaron {
	macaron.Env = setting.Env
	m := macaron.New()
	// automatically set HEAD for every GET request
	m.SetAutoHead(true)

	return m
}

func RunFakeHttpServer() {
	fmt.Println("RunFakeHttpServer\nServer build stamp is", setting.BuildStamp)
}