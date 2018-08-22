

# x/sync/errgroup
https://www.colabug.com/610169.html


Package errgroup provides synchronization, error propagation, and Context cancelation for groups of goroutines working on subtasks of a common task.

- type Group struct
    type Group struct {
        // contains filtered or unexported fields
    }
    A Group is a collection of ``goroutines`` working on subtasks that are part of the same overall task.

- func WithContext(ctx context.Context) (*Group, context.Context)
    返回一个context，如果Go()中的goroutine返回non-nil error或者Wait()返回，都会导致context的cancel发生
    WithContext returns a new Group and an associated Context derived from ctx.
    The derived Context is canceled the first time a function passed to Go returns a non-nil error or the first time Wait returns, whichever occurs first.

- func (g *Group) Go(f func() error)
    Go calls the given function in a new goroutine.
    The first call to return a non-nil error cancels the group; its error will be returned by Wait.

- func (g *Group) Wait() error
    Wait blocks until all function calls from the Go method have returned, then returns the first non-nil error (if any) from them.



demo

```
var g errgroup.Group
var urls = []string{
"http://www.golang.org/",
"http://www.google.com/",
"http://www.somestupidname.com/",
}
for _, url := range urls {
// Launch a goroutine to fetch the URL.
url := url // https://golang.org/doc/faq#closures_and_goroutines
g.Go(func() error {
    // Fetch the URL.
    resp, err := http.Get(url)
    if err == nil {
        resp.Body.Close()
    }
    return err
})
}
// Wait for all HTTP fetches to complete.
if err := g.Wait(); err == nil {
fmt.Println("Successfully fetched all URLs.")
}

```