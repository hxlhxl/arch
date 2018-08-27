package routing

import (
	"net/http"
	// "strings"

	"gopkg.in/macaron.v1"
)

type Router interface {
	Handle(method, pattern string, handlers []macaron.Handler) *macaron.Route
	Get(pattern string, handlers... macaron.Handler) *macaron.Route
}

// RouteRegister allows you to add routes and macaron.Handlers
// that the web server should serve.
type RouteRegister interface {
	Get(string, ...macaron.Handler)
	Post(string, ...macaron.Handler)
	Delete(string, ...macaron.Handler)
	Put(string, ...macaron.Handler)
	Patch(string, ...macaron.Handler)
	Any(string, ...macaron.Handler)
	Group(string, func(RouteRegister), ...macaron.Handler)
	Insert(string, func(RouteRegister), ...macaron.Handler)
	Register(Router)
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


func (rr *routeRegister) Register(router Router) {
	for _, r := range rr.routes {
		if r.method == http.MethodGet {
			router.Get(r.pattern, r.handlers...)
		} else {
			router.Handle(r.method, r.pattern, r.handlers)
		}
	}

	for _, g := range rr.groups {
		g.Register(router)
	}
}

