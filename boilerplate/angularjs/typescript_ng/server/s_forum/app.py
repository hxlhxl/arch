# -*- coding: utf-8 -*-

# stdlib
import sys
import os
from signal import signal, SIGINT
# 3p
from tornado import  gen
from tornado.options import define, options, parse_command_line
from tornado.ioloop import IOLoop
from tornado.web import Application
from tornado.httpclient import AsyncHTTPClient
from tornado.httpserver import HTTPServer
from pymongo.mongo_client import MongoClient
from elasticsearch import Elasticsearch
import yaml
# proj
from utils.dotmap import DotMap
from forum.settings import ROOT_LOCATION, APPLICATION_SETTINGS
from forum.routes import handlers

class Server(object):
    """
        forum server
    """
    def __init__(self):
        self.config = {}
        pass
    def _flag(self):
        """
            设置命令行参数解析
        """
        define('port', default=3000, help='server listen port', type=int)
        define('debug', default=False, help='is debug mode', type=bool)
        parse_command_line()

    def _conf(self):
        """
            读取配置文件
        """
        with open("conf.yml") as h:
            conf = h.read()
            self.config = DotMap(yaml.load(conf))

    def _handler_sigint(self, signalnum, cur_stack_frame):
        sys.exit(1)
        # os.system("kill -9 %d" % os.getpid())

    def run(self):
        signal(SIGINT, self._handler_sigint)
        self._flag()
        self._conf()
        host, port = self.config.mongodb.desAssign(['host', 'port'])
        mongo_client = MongoClient(host, port)
        APPLICATION_SETTINGS.update({
            'debug': options.debug,
            # 'autoreload': True,
            'template_path': os.path.join(ROOT_LOCATION, 'forum'),
            "es": Elasticsearch()
        })
        application = Application(
            handlers=handlers,
            **APPLICATION_SETTINGS
        )
        http_server = HTTPServer(application, xheaders=True)
        http_server.listen(options.port)

        IOLoop.instance().start()
        
if __name__ == '__main__':
    server = Server()
    server.run()