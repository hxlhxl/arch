package api

import (
	"fmt"
	"time"
	"context"
	"path"
	"net/http"
	
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api/routing"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/registry"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/bus"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api/live"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/services/rendering"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/middleware"
	httpstatic "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api/static"
	
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

func (hs *HTTPServer) Run(ctx context.Context) error {
	fmt.Println("starting http_server...")
	// var err error
	hs.context = ctx

	hs.applyRoutes()
	return nil
}

func (hs *HTTPServer) newMacaron() *macaron.Macaron {
	macaron.Env = setting.Env
	m := macaron.New()
	// automatically set HEAD for every GET request
	m.SetAutoHead(true)

	return m
}

func (hs *HTTPServer) applyRoutes() {
	// start with middlewares & static routes
	hs.addMiddlewaresAndStaticRoutes()
}

func (hs *HTTPServer) addMiddlewaresAndStaticRoutes() {
	m := hs.macaron

	m.Use(middleware.Logger())

	// if setting.EnableGzip {
	// 	m.Use(middleware.Gziper())
	// }

	// m.Use(middleware.Recovery())

	// for _, route := range plugins.StaticRoutes {
	// 	pluginRoute := path.Join("/public/plugins/", route.PluginId)
	// 	hs.log.Debug("Plugins: Adding route", "route", pluginRoute, "dir", route.Directory)
	// 	hs.mapStatic(hs.macaron, route.Directory, "", pluginRoute)
	// }

	hs.mapStatic(m, setting.StaticRootPath, "build", "public/build")
	hs.mapStatic(m, setting.StaticRootPath, "", "public")
	hs.mapStatic(m, setting.StaticRootPath, "robots.txt", "robots.txt")

	fmt.Println(setting.StaticRootPath, "_+_+_+_+_+")
}


func (hs *HTTPServer) mapStatic(m *macaron.Macaron, rootDir string, dir string, prefix string) {
	headers := func(c *macaron.Context) {
		c.Resp.Header().Set("Cache-Control", "public, max-age=3600")
	}

	if prefix == "public/build" {
		headers = func(c *macaron.Context) {
			c.Resp.Header().Set("Cache-Control", "public, max-age=31536000")
		}
	}

	if setting.Env == setting.DEV {
		headers = func(c *macaron.Context) {
			c.Resp.Header().Set("Cache-Control", "max-age=0, must-revalidate, no-cache")
		}
	}

	m.Use(httpstatic.Static(
		path.Join(rootDir, dir),
		httpstatic.StaticOptions{
			SkipLogging: true,
			Prefix:      prefix,
			AddHeaders:  headers,
		},
	))
}

func RunFakeHttpServer() {
	fmt.Println()
	fmt.Println()
	fmt.Println()
	fmt.Println()
	fmt.Println()
	fmt.Println("------------------------------------------------------------")
	fmt.Println("RunFakeHttpServer\nServer build stamp is", setting.BuildStamp)
}