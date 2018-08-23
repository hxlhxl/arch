package live

import (
	"github.com/gorilla/websocket"
)

type connection struct {
	hub		*hub
	ws		*websocket.Conn
	send	chan[]byte
}