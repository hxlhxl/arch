'''


外观模式：为子系统中的一组接口提供一个统一的入口。外观模式定义了一个高层接口，
这个接口使得这一子系统更加容易使用。
代理模式： 感觉和代理模式很像,但是代理可以对请求作一些控制，而外观模式就只是整合了子系统接口，使之变得统一。
Facade Pattern: Provide a unified interface to a set of interfaces in a subsystem. 
Facade defines a higher-level interface that makes the subsystem easier to use.

---------------------------
# 申请Ucloud主机


Uhost
Unet
...

args
一次申请5台机器，三台有eip，2台5eip
---------------------------
'''


class ApiClient(object):
    pass

class Uhost(object):
    def __init__(self):
        pass
    def CreateUHostInstance_argv(self):
        pass

class Unet(object):
    def __init__(self):
        pass
    def bindEip_argv(self):
        pass

class Facade(object):
    

    def buyUhostInstance(self,request):
        # 多线程创建
        uhost_argv = request
        unet_argv = request
        def _createUhostInstance(argv):
            # ApiClient
            # log
            pass
        def _allocateEip(argv):
            # ApiClient
            # log
            pass
        # 创建number个线程去申请uhost,并把结果放到一个池子里
        # 创建number个线程去申请eip，并把结果放到一个池子里

        # 线程执行完毕绑定eip
        def _bindEip(argv):
            # ApiClient
            # log
            pass
        
 
    def AllocateEIP(self):
        pass

def parse_argv():
    pass

def main():
    request = {'Region': 'sh','Zone': '001','number': 5,'allocateEip': True}
    facade = Facade()
    facade.buyUhostInstance(request)

if __name__ == '__main__':
    main()








