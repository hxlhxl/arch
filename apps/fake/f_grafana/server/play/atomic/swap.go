package main
import (
	"fmt"
	// "sync"
	// "sync/atomic"
)

type swapHandler struct {
	handler atomic.Value
}

type Handler interface {
	Log(r *Record) error
}

func (h *swapHandler) Log(r *Record) error {
	return (*h.handler.Load().(*Handler)).Log(r)
}

func (h *swapHandler) Swap(newHandler Handler) {
	h.handler.Store(&newHandler)
}

func (h *swapHandler) Get() Handler {
	return *h.handler.Load().(*Handler)
}

func main() {
	h := swapHandler{}
	h.
}