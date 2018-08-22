package main

import (
	"fmt"
)

/**
	切片的初始化



*/
func main() {
	arr := append([]interface{}{"logger", "server"}, "client")
	fmt.Println(arr)
}