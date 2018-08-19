package log

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"

	"github.com/inconshreveable/log15"
)
/**
	log15.Logger: A Logger writes key/value pairs to a Handler
*/
var Root log15.Logger
var loggersToClose []DisposableHandler
var filters map[string]log15.Lvl

func init() {
	// 引入包自动执行
	loggersToClose = make([]DisposableHandler, 0)
	// log15 return the root logger defined in root.go func init
	/** log15 root.go
		var (
			root          *logger
			StdoutHandler = StreamHandler(os.Stdout, LogfmtFormat())
			StderrHandler = StreamHandler(os.Stderr, LogfmtFormat())
		)
		type logger struct {
			ctx []interface{}
			h   *swapHandler
		}
		func Root() {
			return *logger
		}
	*/
	Root = log15.Root()
	Root.SetHandler(log15.DiscardHandler())
}

func New(logger string, ctx ...interface{}) Logger {
	params := append([]interface{}{"logger", logger}, ctx...)
	return Root.New(params)
}