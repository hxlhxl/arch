"""
    作业管理
"""
import abc

class WorkloadStorable(object):
    __metaclass__ = abc.ABCMeta
    @abc.abstractmethod
    def add_workload(self, task):
        """
            添加作业
        """
        pass
    @abc.abstractmethod
    def add_workloads(self, tasks):
        """
            添加作业
        """
        pass
    @abc.abstractmethod
    def assign_workload(self):
        """
            获取一个未处理的作业
        """
        pass
    @abc.abstractmethod
    def complete_workload(self, task, isError=False):
        """
            完成一个作业，isError用来表示处理过程是否出错
        """
        pass
    @abc.abstractmethod
    def remove_workload(self, task):
        """
            删除一个task
        """
        pass
    @abc.abstractmethod
    def update_workload(self, task):
        """
            更新task
        """
        pass
    @abc.abstractmethod
    def clear(self):
        """
            清空作业
        """
        pass
    @abc.abstractmethod
    def get_task_status(self, task):
        """
            获得指定任务的状态
        """
        pass

class Workload(WorkloadStorable):
    def __init__(self):
        pass
    """
        添加任务，用于master向slave请求各个源的数据
    """
    def add_workload(self):
        pass
    """
        分配任务，用于slave中协程分配
    """
    def assign_workload(self):
        pass
    pass
    """
        从master获取例行任务
    """
    def get_workloads(self):
        pass