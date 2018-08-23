package dtos

import "encoding/json"

type StreamMessage struct {
	Stream	string					`json:"stream"`
	Series	[]StreamMessageSeries	`json:"series"`
}

type StreamMessageSeries struct {
	Name		string				`json:"name"`
	Datapointes	[][]json.Number		`json:"datapoints"`
}