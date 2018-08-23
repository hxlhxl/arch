package migrator

import (
	"fmt"
	"strings"

	"github.com/go-xorm/xorm"
)

type Dialect interface {
	DriverName() string
	Quote(string) string
	AndStr() string
	AutoIncrStr() string
	OrStr() string
	EqStr() string
	ShowCreateNull() bool
	SqlType(col *Column) string
	SupportEngine() bool
	LikeStr() string
	Default(col *Column) string
	BooleanStr(bool) string
	DateTimeFunc(string) string

	CreateIndexSql(tableName string, index *Index) string
	CreateTableSql(table *Table) string
	AddColumnSql(tableName string, col *Column) string
	CopyTableData(sourceTable string, targetTable string, sourceCols []string, targetCols []string) string
	DropTable(tableName string) string
	DropIndexSql(tableName string, index *Index) string

	TableCheckSql(tableName string) (string, []interface{})
	RenameTable(oldName string, newName string) string
	UpdateTableSql(tableName string, columns []*Column) string

	ColString(*Column) string
	ColStringNoPk(*Column) string

	Limit(limit int64) string
	LimitOffset(limit int64, offset int64) string

	PreInsertId(table string, sess *xorm.Session) error
	PostInsertId(table string, sess *xorm.Session) error

	CleanDB() error
	NoOpSql() string
}