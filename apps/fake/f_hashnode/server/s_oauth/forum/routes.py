from forum.home.handler import (
    IndexHandler
)
from forum.user.handler import (
    LoginHandler,
    OauthGithub
)

handlers = (
    # /
    (r'/', IndexHandler),
    # Login
    (r'/login', LoginHandler),
    # Oauth
    (r'/api/oauth/github', OauthGithub)
)