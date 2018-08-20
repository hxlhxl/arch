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
		nC		int64
	)
	var mu sync.Mutex

	wg.Add(3000)
	for i := 0; i < 1000; i++ {
		go func() {
			nA = nA + 1
			wg.Done()
		}()
	}
	for i := 0; i < 1000; i++ {
		go func() {
			atomic.AddInt64(&nB, 1)
			wg.Done()
		}()
	}
	for i := 0; i < 1000; i++ {
		go func() {
			mu.Lock()
			nC = nC + 1
			mu.Unlock()
			wg.Done()
		}()
	}
	wg.Wait()
	fmt.Println(nA, nB, nC)
}