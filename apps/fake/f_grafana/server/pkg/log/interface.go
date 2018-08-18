package log

import "github.com/inconshreveable/log15"

type Lvl int

type Logger interface {
	
	New(ctx ...interface{}) log15.Logger
	GetHandler() log15.Handler
	SetHandler(h log15.Handler)

	Debug(msg string, ctx ...interface{})
	Info(msg string, ctx ...interface{})
	Warn(msg string, ctx ...interface{})
	Error(msg string, ctx ...interface{})
	Crit(msg string, ctx ...interface{})
}