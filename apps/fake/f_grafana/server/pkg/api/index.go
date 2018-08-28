package api

import (
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/api/dtos"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	m "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
)

func setIndexViewData(c *m.ReqContext) (*dtos.IndexViewData, error) {
	var data = dtos.IndexViewData{
		User: &dtos.CurrentUser{
			Id:                         c.UserId,
			IsSignedIn:                 c.IsSignedIn,
			Login:                      c.Login,
			Email:                      c.Email,
			Name:                       c.Name,
			OrgCount:                   c.OrgCount,
			OrgId:                      c.OrgId,
			OrgName:                    c.OrgName,
			OrgRole:                    c.OrgRole,
			// GravatarUrl:                dtos.GetGravatarUrl(c.Email),
			IsGrafanaAdmin:             c.IsGrafanaAdmin,
			// LightTheme:                 prefs.Theme == "light",
			// Timezone:                   prefs.Timezone,
			// Locale:                     locale,
			HelpFlags1:                 c.HelpFlags1,
			// HasEditPermissionInFolders: hasEditPermissionInFoldersQuery.Result,
		},
		// Settings:                settings,
		// Theme:                   prefs.Theme,
		// AppUrl:                  appURL,
		// AppSubUrl:               appSubURL,
		GoogleAnalyticsId:       setting.GoogleAnalyticsId,
		GoogleTagManagerId:      setting.GoogleTagManagerId,
		BuildVersion:            setting.BuildVersion,
		BuildCommit:             setting.BuildCommit,
		// NewGrafanaVersion:       plugins.GrafanaLatestVersion,
		// NewGrafanaVersionExists: plugins.GrafanaHasUpdate,
		AppName:                 setting.ApplicationName,
	}
	return &data, nil
}

func Index(c *m.ReqContext) {
	data, err := setIndexViewData(c)
	if err != nil {
		c.Handle(500, "Failed to get settings", err)
		return
	}
	c.HTML(200, "index", data)
}

func NotFoundHandler(c *m.ReqContext) {
	// c.HTML(404, "index", data)
}