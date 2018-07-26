
import threading
from gevent.pool import Pool

class Worker(threading.Thread):
    """
        @param workers {ClassInst} | Workers.__workers
        @param thread_name {String} | 
        @param greenlets_number
    """
    def __init__(self, workers, thread_name, greenlets_number, func, workload):
        self.__workers = workers
        self.__busy = False
        self.__pool = Pool(greenlets_number + 1)
        self.thread_name = thread_name
        self.__func = func
        self.workload = workload
        # 初始化基类对象
        threading.Thread.__init__(self, None, None, self.thread_name, (), {})
        print("%s init complete" % self.thread_name)
    
    """
        重载threading.Thread的run方法,表示这个进程活动时该做什么
    """
    def run(self):
        self.__busy = True
        while self.__busy:
            task = self.workload.assign_workload()

class Workers(object):
    """

        @param workload {} |    // 
        @param func {Function} |    // 任务函数
        @param thread_number {Number} | 10  // 线程数
        @parap greenlets_number {Number | 10 // 协程数
        @param recv_realtime_request {Boolean} | True   // 是否接收实时请求
    """
    def __init__(self, workload, func, thread_number, greenlets_number, recv_realtime_request=True):
        self.__index = 1
        self.__workers = [] // 
        self.__workload = workload
        self.__func = func
        self.__thread_number = thread_number
        self.__greenlets_number = greenlets_number
        # 每个线程中有一个worker
        for i in range(thread_number):
            self.__add_worker()

    def __add_worker(self):
        self.__index += 1
        worker = Worker(self, "work_threadd_" + str(self.__index), self.__greenlets_number, self.__func, self.__workload)
        self.__workers.append(worker)
        return worker

    def start(self):
        """
            @description: 启动线程

        """
        for worker in self.__workers:
            worker.start()
        