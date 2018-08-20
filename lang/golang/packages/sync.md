
# sync

## WaitGroup
A WaitGroup waits for a collection of goroutines to finish. The main goroutine calls Add to set the number of goroutines to wait for. Then each of the goroutines runs and calls Done when finished. At the same time, Wait can be used to block until all goroutines have finished.


# sync/atomic
Package atomic provides low-level atomic memory primitives useful for implementing synchronization algorithms.
atomic 提供的原子操作能够确保任一时刻只有一个goroutine对变量进行操作.

- Add
- Load
- CompareAndSwap,类似数据库乐观锁
- Swap
- Store