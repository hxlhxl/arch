package dtos

import (
	m "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
)

type CurrentUser struct {
	IsSignedIn                 bool         `json:"isSignedIn"`
	Id                         int64        `json:"id"`
	Login                      string       `json:"login"`
	Email                      string       `json:"email"`
	Name                       string       `json:"name"`
	LightTheme                 bool         `json:"lightTheme"`
	OrgCount                   int          `json:"orgCount"`
	OrgId                      int64        `json:"orgId"`
	OrgName                    string       `json:"orgName"`
	OrgRole                    m.RoleType   `json:"orgRole"`
	IsGrafanaAdmin             bool         `json:"isGrafanaAdmin"`
	GravatarUrl                string       `json:"gravatarUrl"`
	Timezone                   string       `json:"timezone"`
	Locale                     string       `json:"locale"`
	HelpFlags1                 m.HelpFlags1 `json:"helpFlags1"`
	HasEditPermissionInFolders bool         `json:"hasEditPermissionInFolders"`
}