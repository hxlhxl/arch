# coding: utf8

'''
########################################
#Wikipedia

In software architecture, publish–subscribe is a messaging pattern where senders of messages, called publishers, 
do not program the messages to be sent directly to specific receivers, called subscribers, 
but instead categorize published messages into classes without knowledge of which subscribers, if any, 
there may be. Similarly, subscribers express interest in one or more classes and only receive messages that are of interest, 
without knowledge of which publishers, if any, there are.

Publish–subscribe is a sibling of the message queue paradigm, 
and is typically one part of a larger message-oriented middleware system. 
Most messaging systems support both the pub/sub and message queue models in their API, 
e.g. Java Message Service (JMS).

This pattern provides greater network scalability and a more dynamic network topology, 
with a resulting decreased flexibility to modify the publisher and the structure of the published data.
#######################################
# 订阅者对象不知道发布者的存在
# 发布者对象不知道订阅者的存在
# 二者通过一个消息队列、消息中心通信
# QQ用户订阅不同的功能(阅读、动漫、音乐、直播)
'''

class Provider(object):
    def __init__(self):
        self.subscribers = {}
        self.msg_queue = []
    def notify(self,msg_type,msg_data):
        msg = {'msg_type':msg_type,'msg_data':msg_data}
        self.msg_queue.append(msg)
    def subscribe(self,msg_type,subscriber):
        self.subscribers.setdefault(msg_type,[]).append(subscriber)
    def unsubscribe(self,msg_type,subscriber):
        self.subscribers[msg_type].remove(subscriber)
    def update(self):
        for msg in self.msg_queue:
            msg_type = msg['msg_type']
            msg_data = msg['msg_data']
            for sub in self.subscribers.get(msg_type,[]):
                sub.run(msg_type,msg_data)
        self.msg_queue = []

class Subscriber(object):
    def __init__(self,name,msg_center):
        self.name = name
        self.provider = msg_center
    def subscribe(self,msg_type):
        self.provider.subscribe(msg_type,self)
    def unsubscribe(self,msg_type):
        self.provider.unsubscribe(msg_type,self)
    def run(self,msg_type,msg_data):
        print("{} got {} service and data is: {}".format(self.name, msg_type,msg_data))

class Publisher(object):
    def __init__(self,msg_center):
        self.provider = msg_center
    def publish(self,msg_type,msg_data):
        self.provider.notify(msg_type,msg_data)

def main():
    msg_center = Provider()

    qq_ext_service = Publisher(msg_center)
    qq_user_hx = Subscriber('hx',msg_center)
    qq_user_hxl = Subscriber('hxl',msg_center)
    qq_user_ypz = Subscriber('ypz',msg_center)
    # subscribe
    qq_user_hx.subscribe('game')
    qq_user_hxl.subscribe('music')
    qq_user_ypz.subscribe('live')
    # publish
    qq_ext_service.publish('game','lol updates!')
    qq_ext_service.publish('music','just the way you are.remix-version release!')
    qq_ext_service.publish('live','malaoc is piing now!')
    # notify
    msg_center.update()
if __name__ == '__main__':
    main()