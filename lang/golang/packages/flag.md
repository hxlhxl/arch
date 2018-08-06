Package flag implements command-line flag parsing

./app --help 的时候会显示该程序的帮助信息

func Parse()
    `Parse` parses the command-line flags from os.Args[1:].Must be called after all flags are defined and before flags are accessed by the program.

func (*FlagSet) NArg()
    NArg is the number of arguments remaining after flags have been processed.

func Args() []string
    Args returns the non-flag command-line arguments.
    返回不是flag解析的参数，比如`go run build.go setup`中的setup参数

