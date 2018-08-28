package middleware

import (
	"time"
	"net/http"
	"fmt"
	
	m "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	"gopkg.in/macaron.v1"
)

func Logger() macaron.Handler {
	return func(res http.ResponseWriter, req *http.Request, c *macaron.Context) {
		for key, _ := range c.Data {
			fmt.Println("key is: ", key)
		}
		start := time.Now()
		c.Data["perfmon.start"] = start

		rw := res.(macaron.ResponseWriter)
		c.Next()

		timeTakenMs := time.Since(start) / time.Millisecond

		status := rw.Status()
		fmt.Print("http logger starting:>>>>>","status is: ", status)
		if status == 200 || status == 304 {
			if !setting.RouterLogging {
				return
			}
		}

		if ctx, ok := c.Data["ctx"]; ok {
			ctxTyped := ctx.(*m.ReqContext)
			if status == 500 {
				ctxTyped.Logger.Error("Request Completed", "method", req.Method, "path", req.URL.Path, "status", status, "remote_addr", c.RemoteAddr(), "time_ms", int64(timeTakenMs), "size", rw.Size(), "referer", req.Referer())
			} else {
				ctxTyped.Logger.Info("Request Completed", "method", req.Method, "path", req.URL.Path, "status", status, "remote_addr", c.RemoteAddr(), "time_ms", int64(timeTakenMs), "size", rw.Size(), "referer", req.Referer())
			}
		}
	}
}