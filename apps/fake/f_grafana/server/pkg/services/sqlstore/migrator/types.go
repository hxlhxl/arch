package migrator

import (

)

type Index struct {
	Name		string
	Type		int
	Cols		[]string
}

type Table struct {
	Name		string
	Columns		[]*Column
	PrimaryKeys	[]string
	Indices		[]*Index
}

type Migration interface {
	Sql(dialect Dialect) string
	Id() string
	SetId() string
	GetCondition() MigrationCondition
}