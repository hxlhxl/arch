package main

import (
	"context"
	"fmt"
	"os"
	"flag"
	"time"
	"io/ioutil"
	"path/filepath"
	"strconv"

	"github.com/facebookgo/inject"

	"golang.org/x/sync/errgroup"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/registry"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/bus"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/middleware"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api/routing"

)

type GrafanaServerImpl struct {
	context				context.Context
	shutdownFn			context.CancelFunc
	childRoutines		*errgroup.Group
	log					log.Logger	// pkg.log.interface
	cfg					*setting.Cfg
	shutdownReason		string
	shutdownInProgress	bool

	RouteRegister		routing.RouteRegister	`inject:""`
	HttpServer 			*api.HTTPServer		`inject:""`
}

func NewGrafanaServer() *GrafanaServerImpl{
	rootCtx, shutdownFn := context.WithCancel(context.Background())	// root context和cancelFn
	childRoutines, childCtx := errgroup.WithContext(rootCtx)	// childRoutines是Group类型，childRoutines.Go调用后会有一组任务
	return &GrafanaServerImpl {
		context:		childCtx,
		shutdownFn:		shutdownFn,
		childRoutines:	childRoutines,
		log:			log.New("server"),
		cfg:			setting.NewCfg(),
	}
}

func (g *GrafanaServerImpl) Run() error {
	fmt.Println("server starting...")
	g.loadConfiguration()
	g.writePIDFile()

	// login.Init()
	// social.NewOAuthService()

	// DI facebookgo/inject
	serviceGraph := inject.Graph{}
	serviceGraph.Provide(&inject.Object{Value: bus.GetBus()})
	serviceGraph.Provide(&inject.Object{Value: g.cfg})
	serviceGraph.Provide(&inject.Object{Value: routing.NewRouteRegister(middleware.RequestMetrics, middleware.RequestTracing)})
	// self registered service
	services := registry.GetServices()
	// Add all services to dependency graph
	for _, service := range services {
		serviceGraph.Provide(&inject.Object{Value: service.Instance})
	}
	serviceGraph.Provide(&inject.Object{Value: g})
	if err := serviceGraph.Populate(); err != nil {
		fmt.Println("Populate error!: %v", err)
		return fmt.Errorf("Failed to populate service dependency: %v", err)
	}
	fmt.Println("Init & start services")
	// Init & start services
	for _, service := range services {
		g.log.Info("Initializing " + service.Name)

		if err := service.Instance.Init(); err != nil {
			return fmt.Errorf("Service init failed: %v", err)
		}
	}

	for _, srv := range services {
		descriptor := srv
		service, ok := srv.Instance.(registry.BackgroundService)
		if !ok {
			continue
		}

		if registry.IsDisabled(descriptor.Instance) {
			continue
		}

		g.childRoutines.Go(func() error {
			if g.shutdownInProgress {
				return nil
			}
			
			err := service.Run(g.context)

			if err != context.Canceled && err != nil {
				g.log.Error("stopped " + descriptor.Name, "reason ", err)
			} else {
				g.log.Info("Stopped " + descriptor.Name, "reason ", err)
			}

			g.shutdownInProgress = true
			return err
		})
	}

	return g.childRoutines.Wait()
}

func (g *GrafanaServerImpl) loadConfiguration() {
	fmt.Println("starting load configuration...")
	err := g.cfg.Load(&setting.CommandLineArgs{
		Config:		*configFile,
		HomePath:	*homePath,
		Args:		flag.Args(),
	})

	if err != nil {
		fmt.Fprintf(os.Stderr, "Failed to start grafana. error: %s\n", err.Error())
		os.Exit(1)
	}

	g.log.Info("Starting" + setting.ApplicationName, "version", version, "commit", commit, "compiled", time.Unix(setting.BuildStamp, 0))
	g.cfg.LogConfigSources()
}

func (g *GrafanaServerImpl) Shutdown(reason string) {}

func (g *GrafanaServerImpl) Exit(reason error) int {
	return 1
}

func (g *GrafanaServerImpl) writePIDFile() {
	if *pidFile == "" {
		return
	}
	// Ensure the required directory structure exists.
	err := os.MkdirAll(filepath.Dir(*pidFile), 0700)	// -rwx------
	if err != nil {
		g.log.Error("Failed to verify pid directory", "error", err)
		os.Exit(1)
	}

	// Retrieve the PID and write it
	pid := strconv.Itoa(os.Getpid())
	if err := ioutil.WriteFile(*pidFile, []byte(pid), 0644); err != nil {	// -rw-r--r--
		g.log.Error("Failed to wirte pidfile", "error", err)
		os.Exit(1)
	}

	g.log.Info("Writing PID file", "path", *pidFile, "pid", pid)
}

func sendSystemNotification(state string) error {
	return nil
}