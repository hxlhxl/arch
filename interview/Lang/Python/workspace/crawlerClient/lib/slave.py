#!/usr/bin/env python
# coding: utf8


# std
import threading
# 3p

# proj
from lib.utils.http import httpClient httpServer
class Slave(object):
    def __init__(self,host,port,master,workers,env):
        '''
        @param host: 实时请求slave使用IP
        @param port: 实时请求slave使用PORT
        @param master: 管理slave的IP:PORT
        @param worker: 线程组
        '''
        self.__httpServer = httpServer.HttpServer(host,port)
        self.__client = httpClient.HttpClient(master)
        self.__master = master
        
        # slave info

        self.__env = env
        self.redis = redis.Redis(host='127.0.0.1',port=6379,password='',db=1)
        # self.__timer = 
        # 互斥信号量
        self.__semaphore = threading.Semaphore()
        self.__workers = workers