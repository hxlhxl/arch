package models

type RoleType string

const (
	ROLE_VIEWER	RoleType = "Viewer"
	ROLE_EDITOR	RoleType = "Editor"
	ROLE_ADMIN	RoleType = "Admin"
)