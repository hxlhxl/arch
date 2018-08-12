from forum.home.handler import (
    IndexHandler
)
from forum.user.handler import (
    LoginHandler
)

handlers = (
    # /
    (r'/', IndexHandler),
    # Login
    (r'/login', LoginHandler)
)