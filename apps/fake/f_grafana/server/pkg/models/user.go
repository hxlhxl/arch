package models

import (
	"time"
)

type User struct {
	Id            int64
	Version       int
	Email         string
	Name          string
	Login         string
	Password      string
	Salt          string
	Rands         string
	Company       string
	EmailVerified bool
	Theme         string
	HelpFlags1    HelpFlags1

	IsAdmin bool
	OrgId   int64

	Created    time.Time
	Updated    time.Time
	LastSeenAt time.Time
}

type SignedInUser struct {
	UserId				int64
	OrgId				int64
	OrgName				string
	OrgRole				RoleType	// string
	Login				string
	Name				string
	Email				string
	ApiKeyId			int64
	OrgCount			int
	IsGrafanaAdmin		bool
	IsAnonymous			bool
	HelpFlags1			HelpFlags1	// uint64
	LastSeenAt			time.Time
}

// ----------------------
// QUERIES

type GetUserByLoginQuery struct {
	LoginOrEmail string
	Result       *User
}

type GetSignedInUserQuery struct {
	UserId int64
	Login  string
	Email  string
	OrgId  int64
	Result *SignedInUser
}