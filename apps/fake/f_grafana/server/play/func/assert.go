package main

import (
	"fmt"
)
// type s sturct {

// }

func test() int64 {
	var a int64 = 100;
	return a.(int64)
	// return a.(int64)
}

func main() {
	r := test()
	fmt.Println("result: ", r)
}