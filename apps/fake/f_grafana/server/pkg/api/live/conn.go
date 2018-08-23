package live

import (
	"github.com/gorilla/websoket"
)

type connection struct {
	hub		*hub
	ws		*websocket.Conn
	send	chan[]byte
}