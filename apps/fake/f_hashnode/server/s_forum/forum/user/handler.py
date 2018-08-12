# 3p
from tornado import gen
# proj
from forum.handler import BaseHandler

__all__ = ['LoginHandler']

class LoginHandler(BaseHandler):
    ''' 登陆 '''
    @gen.coroutine
    def get(self):
        self.render('user/template/login.html')
