package api

import (
	"fmt"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/middleware"
)

func (hs *HTTPServer) registerRoutes()  {
	r := hs.RouteRegister	// 空指针错误?
	reqSignedIn := middleware.Auth(&middleware.AuthOptions{ReqSignedIn: true})
	// not logged in views
	fmt.Println(r, r == nil)
	r.Get("/", reqSignedIn, Index)
}