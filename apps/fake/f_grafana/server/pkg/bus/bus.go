package bus

import (
	"context"
	"errors"
	"reflect"
)

var ErrHandlerNotFound = errors.New("handler not found")

type HandlerFunc interface {}
type Msg interface {}
type TransactionManager interface {
	InTransaction(ctx context.Context, fn func(ctx context.Context) error) error
}
type InProcBus struct {
	handlers			map[string]HandlerFunc
	handlersWithCtx		map[string]HandlerFunc
	listeners			map[string][]HandlerFunc
	wildcardListeners	[]HandlerFunc
	txMng				TransactionManager
}

// temp stuff, not sure how to handle bus instance, and init yet
var globalBus = New()

func New() Bus {
	bus := &InProcBus{}
	bus.handlers = make(map[string]HandlerFunc)
	bus.handlersWithCtx = make(map[string]HandlerFunc)
	bus.listeners = make(map[string][]HandlerFunc)
	bus.wildcardListeners = make([]HandlerFunc, 0)
	bus.txMng = &noopTransactionManager{}

	return bus
}

// Want to get rid of global bus
func GetBus() Bus {
	return globalBus
}

type noopTransactionManager struct{}

func (*noopTransactionManager) InTransaction(ctx context.Context, fn func(ctx context.Context) error) error {
	return fn(ctx)
}


func (b *InProcBus) InTransaction(ctx context.Context, fn func(ctx context.Context) error) error {
	return b.txMng.InTransaction(ctx, fn)
}
type Bus interface {
	Dispatch(msg Msg) error
	// DispatchCtx(ctx context.Context, msg Msg) error
	// Publish(msg Msg) error

	// InTransaction(ctx context.Context, fn func(ctx context.Context) error) error

	// AddHandler(handler HandlerFunc)
	// AddHandlerCtx(handler HandlerFunc)
	// AddEventListener(handler HandlerFunc)
	// AddWildcardListener(handler HandlerFunc)

	// SetTransactionManager(tm TransactionManager)
}

func (b *InProcBus) Dispatch(msg Msg) error {
	var msgName = reflect.TypeOf(msg).Elem().Name()

	var handler = b.handlersWithCtx[msgName]
	withCtx := true

	if handler == nil {
		withCtx = false
		handler = b.handlers[msgName]
	}

	if handler == nil {
		return ErrHandlerNotFound
	}

	var params = []reflect.Value{}
	if withCtx {
		params = append(params, reflect.ValueOf(context.Background()))
	}
	params = append(params, reflect.ValueOf(msg))

	ret := reflect.ValueOf(handler).Call(params)
	err := ret[0].Interface()
	if err == nil {
		return nil
	}
	return err.(error)
}

func Dispatch(msg Msg) error {
	return globalBus.Dispatch(msg)
}