
from tornado.web import RequestHandler

class BaseHandler(RequestHandler):
    def initialize(self):
        ''' 重写父类 '''
        self.es = self.settings["es"]