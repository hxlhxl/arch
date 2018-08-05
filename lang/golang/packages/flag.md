Package flag implements command-line flag parsing

./app --help 的时候会显示该程序的帮助信息

func Parse()
    `Parse` parses the command-line flags from os.Args[1:].Must be called after all flags are defined and before flags are accessed by the program.

func (*FlagSet) NArg()
    NArg is the number of arguments remaining after flags have been processed.