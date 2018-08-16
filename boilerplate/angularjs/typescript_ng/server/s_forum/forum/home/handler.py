# stdlig
# 3p
from tornado import gen
# proj
from forum.handler import BaseHandler

__all__ = ['IndexHandler']

class IndexHandler(BaseHandler):
    @gen.coroutine
    def get(self):
        self.render('home/template/index.html')
