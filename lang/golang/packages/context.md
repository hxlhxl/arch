http://www.flysnow.org/2017/05/12/go-in-action-go-context.html

context的目的用于跟踪goroutine


In Go servers, each incoming request is handled in its own goroutine. Request handlers often start additional goroutines to access backends such as databases and RPC services. The set of goroutines working on a request typically needs access to request-specific values such as the identity of the end user, authorization tokens, and the request's deadline. When a request is canceled or times out, all the goroutines working on that request should exit quickly so the system can reclaim any resources they are using.

At Google, we developed a context package that makes it easy to pass request-scoped values, cancelation signals, and deadlines across API boundaries to all the goroutines involved in handling a request. The package is publicly available as context. This article describes how to use the package and provides a complete working example.

```
type Context interface {
        // Deadline returns the time when work done on behalf of this context
        // should be canceled. Deadline returns ok==false when no deadline is
        // set. Successive calls to Deadline return the same results.
        Deadline() (deadline time.Time, ok bool)

        // Done returns a channel that's closed when work done on behalf of this
        // context should be canceled. Done may return nil if this context can
        // never be canceled. Successive calls to Done return the same value.
        //
        // WithCancel arranges for Done to be closed when cancel is called;
        // WithDeadline arranges for Done to be closed when the deadline
        // expires; WithTimeout arranges for Done to be closed when the timeout
        // elapses.
        //
        // Done is provided for use in select statements:
        //
        //  // Stream generates values with DoSomething and sends them to out
        //  // until DoSomething returns an error or ctx.Done is closed.
        //  func Stream(ctx context.Context, out chan<- Value) error {
        //  	for {
        //  		v, err := DoSomething(ctx)
        //  		if err != nil {
        //  			return err
        //  		}
        //  		select {
        //  		case <-ctx.Done():
        //  			return ctx.Err()
        //  		case out <- v:
        //  		}
        //  	}
        //  }
        //
        // See https://blog.golang.org/pipelines for more examples of how to use
        // a Done channel for cancelation.
        Done() <-chan struct{}

        // If Done is not yet closed, Err returns nil.
        // If Done is closed, Err returns a non-nil error explaining why:
        // Canceled if the context was canceled
        // or DeadlineExceeded if the context's deadline passed.
        // After Err returns a non-nil error, successive calls to Err return the same error.
        Err() error

        // Value returns the value associated with this context for key, or nil
        // if no value is associated with key. Successive calls to Value with
        // the same key returns the same result.
        //
        // Use context values only for request-scoped data that transits
        // processes and API boundaries, not for passing optional parameters to
        // functions.
        //
        // A key identifies a specific value in a Context. Functions that wish
        // to store values in Context typically allocate a key in a global
        // variable then use that key as the argument to context.WithValue and
        // Context.Value. A key can be any type that supports equality;
        // packages should define keys as an unexported type to avoid
        // collisions.
        //
        // Packages that define a Context key should provide type-safe accessors
        // for the values stored using that key:
        //
        // 	// Package user defines a User type that's stored in Contexts.
        // 	package user
        //
        // 	import "context"
        //
        // 	// User is the type of value stored in the Contexts.
        // 	type User struct {...}
        //
        // 	// key is an unexported type for keys defined in this package.
        // 	// This prevents collisions with keys defined in other packages.
        // 	type key int
        //
        // 	// userKey is the key for user.User values in Contexts. It is
        // 	// unexported; clients use user.NewContext and user.FromContext
        // 	// instead of using this key directly.
        // 	var userKey key
        //
        // 	// NewContext returns a new Context that carries value u.
        // 	func NewContext(ctx context.Context, u *User) context.Context {
        // 		return context.WithValue(ctx, userKey, u)
        // 	}
        //
        // 	// FromContext returns the User value stored in ctx, if any.
        // 	func FromContext(ctx context.Context) (*User, bool) {
        // 		u, ok := ctx.Value(userKey).(*User)
        // 		return u, ok
        // 	}
        Value(key interface{}) interface{}
}
```

精简版

```

type context interface {
    Deadline() (deadline time.Time, ok bool)
    Done() <-chan struct{}
    Err() error
    Value(key interface{}) interface{}
    /*
    Deadline方法是获取设置的截止时间的意思，第一个返回式是截止时间，到了这个时间点，Context会自动发起取消请求；第二个返回值ok==false时表示没有设置截止时间，如果需要取消的话，需要调用取消函数进行取消。

    Done方法返回一个只读的chan，类型为struct{}，我们在goroutine中，如果该方法返回的chan可以读取，则意味着parent context已经发起了取消请求，我们通过Done方法收到这个信号后，就应该做清理操作，然后退出goroutine，释放资源。

    Err方法返回取消的错误原因，因为什么Context被取消。

    Value方法获取该Context上绑定的值，是一个键值对，所以要通过一个Key才可以获取对应的值，这个值一般是线程安全的。
    */
}
```

- func Background() Context
  Background是根context，而且绝对不会cancel。所有的子context都可以从background延伸出来。延伸出的context们，会构成一棵context树。
  Background returns a non-nil, empty Context. It is never canceled, has no values, and has no deadline. It is typically used by the main function, initialization, and tests, and as the top-level Context for incoming requests.

- func TODO() Context
- func WithCancel(parent Context) (ctx Context, cancel CancelFunc)
- func WithDeadline(parent Context, d time.Time) (Context, CancelFunc)
- func WithTimeout(parent Context, timeout time.Duration) (Context, CancelFunc)
- func WithValue(parent Context, key, val interface{}) Context


``` demo
package main
import (
	"fmt"
	"time"
	"context"
)
func main() {
	ctx, cancel := context.WithCancel(context.Background())
	go func(ctx context.Context) {
		for {
			select {
			case <-ctx.Done():
				fmt.Println("监控退出，停止了...")
				return
			default:
				fmt.Println("goroutine监控中...")
				time.Sleep(2 * time.Second)
			}
		}
	}(ctx)

	time.Sleep(10 * time.Second)
	fmt.Println("可以了，通知监控停止")
	cancel()
	//为了检测监控过是否停止，如果没有监控输出，就表示停止了
	time.Sleep(5 * time.Second)

}
```