#!/usr/bin/env python
# coding: utf8

import httplib
import urllib

class Basic(object):
    def __init__(self):
        self.conn = httplib.HTTPConnection('www.baidu.com',80)
    def __call__(self):
        self.conn.request('GET','/')
        resp = self.conn.getresponse()
        print resp.read()
class Post(object):
    def __init__(self):
        self.conn = httplib.HTTPConnection('bugs.python.org')
    def __call__(self):
        params = urllib.urlencode({'@number': 12524, '@type': 'issue', '@action': 'show'})
        headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}
        self.conn.request("POST", "", params, headers)
        resp = self.conn.getresponse()
        print resp.read()
if __name__ == '__main__':
    # Basic()()
    Post()()
