
# sync

## WaitGroup
A WaitGroup waits for a collection of goroutines to finish. The main goroutine calls Add to set the number of goroutines to wait for. Then each of the goroutines runs and calls Done when finished. At the same time, Wait can be used to block until all goroutines have finished.

A WaitGroup must not be copied after first use.
```
type WaitGroup struct {
        // contains filtered or unexported fields
}
```

```
var wg sync.WaitGroup
var urls = []string{
        "http://www.golang.org/",
        "http://www.google.com/",
        "http://www.somestupidname.com/",
}
for _, url := range urls {
        // Increment the WaitGroup counter.
        wg.Add(1)
        // Launch a goroutine to fetch the URL.
        go func(url string) {
                // Decrement the counter when the goroutine completes.
                defer wg.Done()
                // Fetch the URL.
                http.Get(url)
        }(url)
}
// Wait for all HTTP fetches to complete.
wg.Wait()
```

func (wg *WaitGroup) Add(delta int)
    Add adds delta, which may be negative, to the WaitGroup counter. If the counter becomes zero, all goroutines blocked on Wait are released. If the counter goes negative, Add panics.

    Note that calls with a positive delta that occur when the counter is zero must happen before a Wait. Calls with a negative delta, or calls with a positive delta that start when the counter is greater than zero, may happen at any time. Typically this means the calls to Add should execute before the statement creating the goroutine or other event to be waited for. If a WaitGroup is reused to wait for several independent sets of events, new Add calls must happen after all previous Wait calls have returned. See the WaitGroup example.


func (wg *WaitGroup) Done()
    Done decrements the WaitGroup counter by one.

func (wg *WaitGroup) Wait()
    Wait blocks until the WaitGroup counter is zero.

# sync/atomic
Package atomic provides low-level atomic memory primitives useful for implementing synchronization algorithms.
atomic 提供的原子操作能够确保任一时刻只有一个goroutine对变量进行操作.

- Add
- Load
- CompareAndSwap,类似数据库乐观锁
- Swap
- Store