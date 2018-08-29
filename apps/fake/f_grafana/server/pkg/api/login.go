package api

import (
	"net/url"

	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/bus"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/setting"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/log"
	"github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/services/session"
	m "github.com/hxlhxl/arch/apps/fake/f_grafana/server/pkg/models"
)
func LoginView(c *m.ReqContext) {
	viewData, err := setIndexViewData(c)
	if err != nil {
		c.Handle(500, "Failed to get settings", err)
		return
	}

	// enabledOAuths := make(map[string]interface{})
	// for key, oauth := range setting.OAuthService.OAuthInfos {
	// 	enabledOAuths[key] = map[string]string{"name": oauth.Name}
	// }

	// viewData.Settings["oauth"] = enabledOAuths
	viewData.Settings["disableUserSignUp"] = !setting.AllowUserSignUp
	viewData.Settings["loginHint"] = setting.LoginHint
	viewData.Settings["disableLoginForm"] = setting.DisableLoginForm

	if loginError, ok := c.Session.Get("loginError").(string); ok {
		c.Session.Delete("loginError")
		viewData.Settings["loginError"] = loginError
	}

	if !tryLoginUsingRememberCookie(c) {
		c.HTML(200, ViewIndex, viewData)
		return
	}

	if redirectTo, _ := url.QueryUnescape(c.GetCookie("redirect_to")); len(redirectTo) > 0 {
		c.SetCookie("redirect_to", "", -1, setting.AppSubUrl+"/")
		c.Redirect(redirectTo)
		return
	}

	c.Redirect(setting.AppSubUrl + "/")
}


func tryLoginUsingRememberCookie(c *m.ReqContext) bool {
	// Check auto-login.
	uname := c.GetCookie(setting.CookieUserName)
	if len(uname) == 0 {
		return false
	}

	isSucceed := false
	defer func() {
		if !isSucceed {
			log.Trace("auto-login cookie cleared: %s", uname)
			c.SetCookie(setting.CookieUserName, "", -1, setting.AppSubUrl+"/")
			c.SetCookie(setting.CookieRememberName, "", -1, setting.AppSubUrl+"/")
			return
		}
	}()

	userQuery := m.GetUserByLoginQuery{LoginOrEmail: uname}
	if err := bus.Dispatch(&userQuery); err != nil {
		return false
	}

	user := userQuery.Result

	// validate remember me cookie
	signingKey := user.Rands + user.Password
	if len(signingKey) < 10 {
		c.Logger.Error("Invalid user signingKey")
		return false
	}

	if val, _ := c.GetSuperSecureCookie(signingKey, setting.CookieRememberName); val != user.Login {
		return false
	}

	isSucceed = true
	loginUserWithUser(user, c)
	return true
}

func loginUserWithUser(user *m.User, c *m.ReqContext) {
	if user == nil {
		log.Error(3, "User login with nil user")
	}

	c.Resp.Header().Del("Set-Cookie")

	days := 86400 * setting.LogInRememberDays
	if days > 0 {
		c.SetCookie(setting.CookieUserName, user.Login, days, setting.AppSubUrl+"/")
		c.SetSuperSecureCookie(user.Rands+user.Password, setting.CookieRememberName, user.Login, days, setting.AppSubUrl+"/")
	}

	c.Session.RegenerateId(c.Context)
	c.Session.Set(session.SESS_KEY_USERID, user.Id)
}