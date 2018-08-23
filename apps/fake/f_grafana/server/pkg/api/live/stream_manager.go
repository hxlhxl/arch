package live

import (
	"context"
	// "net/http"
	"sync"

	// "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/components/simplejson"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	// m "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
)

type Stream {
	subscribers	[]*connection
	name		string
}

type StreamManager struct {
	log				log.Logger
	streams			map[string]*Stream
	streamRWMutex	*sync.RWMutex
	hub				*hub
}

// func NewStreamManager() *StreamManager {
// 	return &StreamManager {
// 		hub:			newHub(),
// 		log:			log.New("stream.manager"),
// 		streams:		make(map[string]*Stream),
// 		streamRWMutex:	&sync.RWMutex{},
// 	}
// }

// func (sm *StreamManager) Run(context context.Context) {}