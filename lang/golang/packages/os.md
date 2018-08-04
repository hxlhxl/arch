


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