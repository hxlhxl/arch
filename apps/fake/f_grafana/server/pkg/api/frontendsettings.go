package api

import (
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	m "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
)

func getFrontendSettingsMap(c *m.ReqContext) (map[string]interface{}, error)  {
	// orgDataSources := make([]*m.DataSource, 0)

	// if c.OrgId != 0 {
	// 	query := m.GetDataSources
	// }

	jsonObj := map[string]interface{}{
		// "defaultDatasource":       defaultDatasource,
		// "datasources":             datasources,
		// "panels":                  panels,
		"appSubUrl":               setting.AppSubUrl,
		"allowOrgCreate":          (setting.AllowUserOrgCreate && c.IsSignedIn) || c.IsGrafanaAdmin,
		"authProxyEnabled":        setting.AuthProxyEnabled,
		"ldapEnabled":             setting.LdapEnabled,
		"alertingEnabled":         setting.AlertingEnabled,
		"exploreEnabled":          setting.ExploreEnabled,
		"googleAnalyticsId":       setting.GoogleAnalyticsId,
		"disableLoginForm":        setting.DisableLoginForm,
		"externalUserMngInfo":     setting.ExternalUserMngInfo,
		"externalUserMngLinkUrl":  setting.ExternalUserMngLinkUrl,
		"externalUserMngLinkName": setting.ExternalUserMngLinkName,
		"buildInfo": map[string]interface{}{
			"version":       setting.BuildVersion,
			"commit":        setting.BuildCommit,
			"buildstamp":    setting.BuildStamp,
			// "latestVersion": plugins.GrafanaLatestVersion,
			// "hasUpdate":     plugins.GrafanaHasUpdate,
			"env":           setting.Env,
			"isEnterprise":  setting.IsEnterprise,
		},
	}

	return jsonObj, nil
}