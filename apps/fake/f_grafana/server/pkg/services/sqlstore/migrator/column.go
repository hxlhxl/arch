package migrator

type Column struct {
	Name			string
	Type			string
	Length			int
	Length2			int
	Nullable		bool
	IsPrimaryKey	bool
	IsAutoIncrement	bool
	Default			string
}