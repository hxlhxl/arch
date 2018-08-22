package main

import (
	"context"
	"fmt"

	"golang.org/x/sync/errgroup"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"

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
	HttpServer 			*api.HttpServer		`inject:""`
}

func NewGrafanaServer() *GrafanaServerImpl{
	rootCtx, shutdownFn := context.WithCancel(context.Background())
	childRoutines, childCtx := errgroup.WithContext(rootCtx)	// childRoutines是一组goroutines
	return &GrafanaServerImpl {
		context:		childCtx,
		shutdownFn:		shutdownFn,
		childRoutines:	childRoutines,
		log:			log.New("server"),
	}
}

func (g *GrafanaServerImpl) Run() error {
	fmt.Println("server started...")
	return nil
}