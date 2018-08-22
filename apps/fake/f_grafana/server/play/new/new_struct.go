package main

import (
	"fmt"
	"sync/atomic"
)

type Person struct {
	name	string
	age		int
	color	atomic.Value
}

func main() {
	var p *Person = new(Person)
	fmt.Println(p)
}