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