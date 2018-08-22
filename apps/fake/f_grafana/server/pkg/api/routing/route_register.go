package routing

import (
	"net/http"
	"strings"

	"gopkg.in/macaron.v1"
)

type Router interface {
	Handle()
	Get()
}

type RegisterNamedMiddleware func (name string) macaron.Handler

type route struct {
	method		string
	pattern		string
	handlers	[]macaron.Handler
}

type routeRegister struct {
	prefix			string
	subfixHandlers	[]macaron.Handler
	namedMiddleware	[]RegisterNamedMiddleware
	routes			[]route
	groups			[]*routeRegister
}

