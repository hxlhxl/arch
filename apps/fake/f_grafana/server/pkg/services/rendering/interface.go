package rendering
import (
	"time"
	"context"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
)
type Opts struct {
	Width		int
	Height		int
	Timeout		time.Duration
	OrgId		int64
	UserId		int64
	OrgRole		models.RoleType
	Path		string
	Encoding	string
	Timezone	string
}
type RenderResult struct {
	FilePath	string
}
type Service interface {
	Render(ctx context.Context, opts Opts) (*RenderResult, error)
}