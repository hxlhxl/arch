package live

import (
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api/dtos"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"

)
type streamSubscription struct {
	conn		*connection
	name		string
	remove		bool
}

type hub struct {
	log				log.Logger
	connections		map[*connection]bool
	streams			map[string]map[*connection]bool

	register		chan *connection
	unregister		chan *connection
	streamChannel	chan *dtos.StreamMessage
	subChannel		chan *streamSubscription
}

func newHub() *hub {
	return &hub {
		connections:	make(map[*connection]bool),
		streams:		make(map[string]map[*connection]bool),
		register:		make(chan *connection),
		unregister:		make(chan *connection),
		streamChannel:		make(chan *dtos.StreamMessage),
		subChannel:		make(chan *streamSubscription),
		log:			log.New("stream.hub"),
	}
}