package bus

import (
	"context"
	"errors"
	"reflect"
)
type HandlerFunc interface {}
type Msg interface {}
type TransactionManager interface {
	InTransaction(ctx context.Context, fn func(ctx context.Context) error) error
}
type InProcBus struct {
	handlers			map[string]HandlerFunc
	handlersWithCtx		map[string]HandlerFunc
	listeners			map[string]HandlerFunc
	wildcardListeners	[]HandlerFunc
	txMng				TransactionManager
}
func (b *InProcBus) InTransaction(ctx context.Context, fn func(ctx context.Context) error) error {
	return b.txMng.InTransaction(ctx, fn)
}
type Bus interface {
	Dispatch(msg Msg) error
	DispatchCtx(ctx context.Context, msg Msg) error
	Publish(msg Msg) error

	InTransaction(ctx context.Context, fn func(ctx context.Context) error) error

	AddHandler(handler HandlerFunc)
	AddHandlerCtx(handler HandlerFunc)
	AddEventListener(handler HandlerFunc)
	AddWildcardListener(handler HandlerFunc)

	SetTransactionManager(tm TransactionManager)
}