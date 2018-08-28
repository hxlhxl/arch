package middleware

import (
	"strconv"
	
	m "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/bus"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/util"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/services/session"
	"gopkg.in/macaron.v1"
)

func GetContextHandler() macaron.Handler {
	return func(c *macaron.Context) {
		ctx := &m.ReqContext {
			Context:			c,
			SignedInUser:		&m.SignedInUser{},
			Session:			session.GetSession(),
			IsSignedIn:			false,
			AllowAnonymous:		false,
			Logger:				log.New("context"),
		}

		orgId := int64(0)
		orgIdHeader := ctx.Req.Header.Get("X-Grafana-Org-Id")
		if orgIdHeader != "" {
			orgId, _ = strconv.ParseInt(orgIdHeader, 10, 64)
		}
		/*
		the order in which these are tested are important look for api key in Authorization header first.
		then init session and look for userId in session
		then look for api key in session (special case for render calls via api)
		then test if anonymous access is enabled
		*/
		// if initContextWithRenderAuth(ctx) ||
		// 	initContextWithApiKey(ctx) ||
		// 	initContextWithBasicAuth(ctx, orgId) ||
		// 	initContextWithAuthProxy(ctx, orgId) ||
		// 	initContextWithUserSessionCookie(ctx, orgId) ||
		// 	initContextWithAnonymousUser(ctx) {}
		if initContextWithBasicAuth(ctx, orgId) {}
		ctx.Logger = log.New("context", "userId", ctx.UserId, "orgId", ctx.OrgId, "uname", ctx.Login)
		ctx.Data["ctx"] = ctx

		c.Map(ctx)

	}
}

// func initContextWithAnonymousUser(ctx *m.ReqContext) bool {
// 	return false
// }

func initContextWithBasicAuth(ctx *m.ReqContext, orgId int64) bool {

	if !setting.BasicAuthEnabled {
		return false
	}

	header := ctx.Req.Header.Get("Authorization")
	if header == "" {
		return false
	}

	username, password, err := util.DecodeBasicAuthHeader(header)
	if err != nil {
		ctx.JsonApiErr(401, "Invalid Basic Auth Header", err)
		return true
	}

	loginQuery := m.GetUserByLoginQuery{LoginOrEmail: username}
	if err := bus.Dispatch(&loginQuery); err != nil {
		ctx.JsonApiErr(401, "Basic auth failed", err)
		return true
	}

	user := loginQuery.Result

	loginUserQuery := m.LoginUserQuery{Username: username, Password: password, User: user}
	if err := bus.Dispatch(&loginUserQuery); err != nil {
		ctx.JsonApiErr(401, "Invalid username or password", err)
		return true
	}

	query := m.GetSignedInUserQuery{UserId: user.Id, OrgId: orgId}
	if err := bus.Dispatch(&query); err != nil {
		ctx.JsonApiErr(401, "Authentication error", err)
		return true
	}

	ctx.SignedInUser = query.Result
	ctx.IsSignedIn = true
	return true
}

// func initContextWithUserSessionCookie(ctx *m.ReqContext, orgId int64) bool {
// 	return false
// }
