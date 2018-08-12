#!/usr/bin/env python
# coding: utf8

# std
import sys
import socket
import socketserver

# 3p
from gevent.pywsgi import WSGIServer
from gevent import momkey
# proj


momkey.patch_all()

class HttpServer(object):
    def __init__(self,host,port):
        self,path = {}
        self.server = WSGIServer((host,port),self.application)
    def application(self,environ,start_response):
        status = '200 OK'
        headers = [
            ('Content-Type','text/html')
        ]
        