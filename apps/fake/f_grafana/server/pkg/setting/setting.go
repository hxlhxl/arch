package setting

import (
	"runtime"
	"time"
	"gopkg.in/ini.v1"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
)

var (
	BuildVersion	string
	BuildCommit		string
	BuildStamp		int64
	IsEnterprise	bool

	IsWindows		bool
)

type Cfg struct {
	Raw						*ini.File
	ProvisioningPath		string
	Smtp					SmtpSettings
	ImagesDir				string
	PhantomDir				string
	RendererUrl				string
	DisableBruteForceLoginProtection	bool
	TempDataLifetime		time.Duration
}

func init() {
	IsWindows = runtime.GOOS == "windows"
	logger = log.New("settings")
}

func NewCfg() *Cfg {
	return &Cfg {
		Raw:	ini.Empty(),	// *File 文件指针
	}
}