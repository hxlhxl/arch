package main

import (
	"context"
	"fmt"

	"golang.org/x/sync/errgroup"
)

type GrafanaServerImpl struct {
	context				context.Context
	shutdownFn			context.CancelFunc
	childRoutines		*errgroup.Group
	log					log.Logger
	cfg					*setting.Cfg
	shutdownReason		string
	shutdownInProgress	bool

	RouteRegister		routing.RouteRegister	`inject:""`
	HttpServer 			*api.HttpServer		`inject:""`
}

func NewGrafanaServer() *GrafanaServerImpl{

	return &GrafanaServerImpl {

	}
}

func (g *GrafanaServerImpl) Run() error {
	fmt.Println("server started...")
	return nil
}