# os


func Open(name string) (*File, error)
    Open opens the named file for reading. If successful, methods on the returned file can be used for reading; the associated file descriptor has mode O_RDONLY. If there is an error, it will be of type *PathError.
    打开文件后要记得关闭
    ```
    reader, err := os.Open("package.json")
    if err != nil {
        log.Fatal("Failed to open package.json")
        return
    }
    defer reader.close()
    ```
    
func Getwd() (dir string, err error)
    返回当前执行文件
func Getenv(key string) string
    根据key获取环境变量的值，如果没有环境变量则会返回empty string，可以使用LookupEnv区分空字符串还是没有设置环境变量
func Setenv(key, value string) error
    设置环境变量

func RemoveAll(path string) error
    RemoveAll removes path and any children it contains. It removes everything it can but returns the first error it encounters. If the path does not exist, RemoveAll returns nil (no error).

# os/exec

type Cmd {
    Stdout  // 设置标准输出
    Stderr  // 设置标准错误输出
}


func Command(name string, arg ...string) *Cmd
    构造一个可执行命令结构Cmd
    Command returns the Cmd struct to execute the named program with the given arguments.

    It sets only the Path and Args in the returned structure.

    If name contains no path separators, Command uses LookPath to resolve name to a complete path if possible. Otherwise it uses name directly as Path.

    The returned Cmd's Args field is constructed from the command name followed by the elements of arg, so arg should not include the command name itself. For example, Command("echo", "hello"). Args[0] is always name, not the possibly resolved Path.


func (c *Cmd) CombinedOutput() ([]byte, error)
    CombinedOutput runs the command and returns its combined standard output and standard error.

func (c *Cmd) Run() error
    运行命令
    Run starts the specified command and waits for it to complete.

    The returned error is nil if the command runs, has no problems copying stdin, stdout, and stderr, and exits with a zero exit status.

    If the command starts but does not complete successfully, the error is of type *ExitError. Other error types may be returned for other situations.

    If the calling goroutine has locked the operating system thread with runtime.LockOSThread and modified any inheritable OS-level thread state (for example, Linux or Plan 9 name spaces), the new process will inherit the caller's thread state.