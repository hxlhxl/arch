package migrator
import (
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"

	"github.com/go-xorm/xorm"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/lib/pq"
	_ "github.com/mattn/go-sqlite3"
)
type Migrator struct {
	x			*xorm.Engine
	dialect		Dialect
	migrations	[]Migration
	Logger		log.Logger
}