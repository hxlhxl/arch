# stdlig
import json
# 3p
from tornado import gen
from tornado.httpclient import HTTPRequest, AsyncHTTPClient
# proj
from forum.handler import BaseHandler

__all__ = ['LoginHandler', 'OauthGithub']

class LoginHandler(BaseHandler):
    ''' 登陆 '''
    @gen.coroutine
    def get(self):
        self.render('user/template/login.html')

class OauthGithub(BaseHandler):
    ''' github oauth server '''
    @gen.coroutine
    def get(self):
        params = self.get_params()
        print(type(params), params.code)
        body = {
            'code': params.code,
            'client_id': '606abe84965df784b124',
            'client_secret': '7b3788d3b5c34b6dc24dd40cf727e2e05f3a2c3a'
        }
        config = {
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        res_access_token = yield self.request_post('https://github.com/login/oauth/access_token', body, config)
        print('res_access_token', res_access_token, res_access_token.access_token)
        params = {
            'access_token': res_access_token.access_token
        }
        config = {
            'headers': {
                'Accept': 'application/json;application/vnd.github.v3+json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36',
                'Host': 'api.github.com'
            }
        }
        res_user = yield self.request_get('https://api.github.com/user', params, config)
        print('res_user', res_user.reverse())

        res = {
            'retCode': '0',
            'errMsg': 'aaaaaa',
            'data': res_user.reverse()
        }
        self.write(res)