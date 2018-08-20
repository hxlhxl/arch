package main
import (
	"fmt"
	"sync"
	"sync/atomic"
)
func main() {
	var (
		wg     sync.WaitGroup
		nA		int64
		nB		int64
	)
	wg.Add(2000)
	for i := 0; i < 1000; i++ {
		go func() {
			nA++
			wg.Done()
		}()
	}
	for i := 0; i < 1000; i++ {
		go func() {
			atomic.AddInt64(&nB, 1)
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Println(nA, nB)
}