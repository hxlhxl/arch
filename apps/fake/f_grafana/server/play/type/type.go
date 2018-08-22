package main

import (
	"fmt"
)

func main() {
	type ix int64;
	var my ix = ix(100)
	var myy int64 = int64(1000)
	fmt.Println(my, "haha", myy)

	tmp := int64(100)
	fmt.Println(tmp)
}