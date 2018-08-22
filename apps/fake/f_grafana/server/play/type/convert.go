package main

import (
	"fmt"
	"time"
)

type log interface {
	Error(string)
}

type wrapFunc func(string)

func WrapFunc(fn func(string)) wrapFunc{
	return wrapFunc(fn)
}

func (f wrapFunc) Error(s string) {
	fmt.Print(time.Now(),"\t")
	f(s)
}

func echo(s string) {
	fmt.Println(s)
}

func main() {
	f := WrapFunc(echo)
	f.Error("hello world")
}