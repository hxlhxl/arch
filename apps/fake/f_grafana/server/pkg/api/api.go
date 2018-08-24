package api

import (
	"fmt"
)

func (hs *HTTPServer) registerRoutes()  {
	r := hs.RouteRegister
	
	fmt.Println(r)
	// r.Get("/", reqSignedIn, Index)
}