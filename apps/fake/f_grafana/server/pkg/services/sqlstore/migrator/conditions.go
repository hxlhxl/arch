package migrator

type MigrationCondition interface {
	Sql(dialect Dialect) (string, []interface{})
}