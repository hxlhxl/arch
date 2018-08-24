package main

import (
	"context"
	"fmt"

	"golang.org/x/sync/errgroup"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api"
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
	fmt.Println("server started...")
	return nil
}

func (g *GrafanaServerImpl) loadConfiguration() {}

func (g *GrafanaServerImpl) Shutdown(reason string) {}

func (g *GrafanaServerImpl) Exit(reason error) int {
	return 1
}

func (g *GrafanaServerImpl) writePIDFile() {}

func sendSystemNotification(state string) error {
	return nil
}