package main

import (
    "log"
    "net/http"

    "gopkg.in/macaron.v1"
)

func main() {
    m := macaron.Classic()
    m.Get("/", myHandler)
	m.Use(func(ctx *macaron.Context) {
		log.Println("middleware : ",ctx.Req.RequestURI)
	})
    log.Println("Server is running...")
    log.Println(http.ListenAndServe("0.0.0.0:4000", m))
}

func myHandler(ctx *macaron.Context) string {
    return "the request path is: " + ctx.Req.RequestURI
}