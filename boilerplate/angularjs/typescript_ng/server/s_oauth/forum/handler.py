
# stdlib
import urllib
# 3p
import tornado
from tornado import gen
from tornado.web import RequestHandler
from tornado.httpclient import HTTPRequest, AsyncHTTPClient
from tornado.httputil import url_concat
# proj
from utils.dotmap import DotMap
class BaseHandler(RequestHandler):
    def initialize(self):
        ''' 重写父类 '''
        self.es = self.settings["es"]
    
    def get_params(self):
        query = self.request.query
        res = {}
        for param in query.split('&'):
            key, value = param.split('=')
            res[key] = value
        return DotMap(res)

    @gen.coroutine
    def request_get(self, url, params, config):
        http_client = AsyncHTTPClient()
        url = url_concat(url, params)
        print(url, '---+++---', self.settings)
        ext = {}
        if self.settings['debug_proxy'] and self.settings['debug_proxy_config']:
            ext['proxy_host'] = self.settings['debug_proxy_config.host']
            ext['proxy_port'] = self.settings['debug_proxy_config.port']
        req = HTTPRequest(
            url=url,
            method='GET',
            **config,
            **ext
        )
        response = yield http_client.fetch(req)
        return DotMap(tornado.escape.json_decode(response.body))

    @gen.coroutine
    def request_post(self, url, body, config):
        http_client = AsyncHTTPClient()
        req = HTTPRequest(
            url=url,
            method='POST',
            body=urllib.parse.urlencode(body),
            **config
        )
        response = yield http_client.fetch(req)
        return DotMap(tornado.escape.json_decode(response.body))