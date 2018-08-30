package main

import "gopkg.in/macaron.v1"

func main() {
    m := macaron.Classic()
    m.Use(macaron.Renderer())
    
    m.Get("/", func(ctx *macaron.Context) {
        ctx.Data["Name"] = "jeremy"
        ctx.HTML(200, "hello") // 200 为响应码
    })
    
    m.Run()
}