package middleware

import (
	"fmt"
	"net/http"
	// "strconv"
	
	// m "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
	// "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/bus"
	// "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	// "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	// "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/util"
	// "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/services/session"
	"gopkg.in/macaron.v1"
)

func RequestMetrics(handler string) macaron.Handler {
	return func(res http.ResponseWriter, req *http.Request, c *macaron.Context) {
		fmt.Println("~~~~~~~~~~ RequestMetrics ~~~~~~~~~~")
		// rw := res.(macaron.ResponseWriter)
		// now := time.Now()
		// c.Next()

		// status := rw.Status()

		// code := sanitizeCode(status)
		// method := sanitizeMethod(req.Method)
		// metrics.M_Http_Request_Total.WithLabelValues(handler, code, method).Inc()
		// duration := time.Since(now).Nanoseconds() / int64(time.Millisecond)
		// metrics.M_Http_Request_Summary.WithLabelValues(handler, code, method).Observe(float64(duration))

		// if strings.HasPrefix(req.RequestURI, "/api/datasources/proxy") {
		// 	countProxyRequests(status)
		// } else if strings.HasPrefix(req.RequestURI, "/api/") {
		// 	countApiRequests(status)
		// } else {
		// 	countPageRequests(status)
		// }
	}
}