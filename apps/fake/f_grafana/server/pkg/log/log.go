package log

import (
	// "fmt"
	// "os"
	// "path/filepath"
	// "strings"

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
		type swapHandler struct {
			handler atomic.Value
		}
		func Root() {
			return root
		}

		func init() {
			if isatty.IsTerminal(os.Stdout.Fd()) {
				StdoutHandler = StreamHandler(colorable.NewColorableStdout(), TerminalFormat())
			}

			if isatty.IsTerminal(os.Stderr.Fd()) {
				StderrHandler = StreamHandler(colorable.NewColorableStderr(), TerminalFormat())
			}

			root = &logger{[]interface{}{}, new(swapHandler)}
			root.SetHandler(StdoutHandler)
		}
	*/
	Root = log15.Root()
	/**
		func (l *logger) GetHandler() Handler {
			return l.h.Get()
		}

		func (l *logger) SetHandler(h Handler) {
			l.h.Swap(h)
		}
	*/
	Root.SetHandler(log15.DiscardHandler())	// 原子性地换入logger.h为log15.DiscardHandler
}

func New(logger string, ctx ...interface{}) Logger {
	params := append([]interface{}{"logger", logger}, ctx...)
	/*
		func (l *logger) New(ctx ...interface{}) Logger {
			child := &logger{newContext(l.ctx, ctx), new(swapHandler)}
			child.SetHandler(l.h)
			return child
		}

		func newContext(prefix []interface{}, suffix []interface{}) []interface{} {
			normalizedSuffix := normalize(suffix)
			newCtx := make([]interface{}, len(prefix)+len(normalizedSuffix))
			n := copy(newCtx, prefix)
			copy(newCtx[n:], normalizedSuffix)
			return newCtx
		}
	*/
	return Root.New(params)	// 从root构造出child，但是child的handler仍然是root的handler
}