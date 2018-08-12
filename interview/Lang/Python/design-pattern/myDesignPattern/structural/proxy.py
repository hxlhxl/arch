# coding: utf8

'''
# 小明client迷恋女神小红object，托阿花proxyObject送礼物(request...)
# 远程代理
# 虚拟代理  真实对象需要大量时间创建场景，使用虚拟对象
# 保护代理
# 缓存代理
'''

class Guy(object):
    def __init__(self,type_):
        self.type = type_

    def giveGift(self,gift,proxy):
        ret = proxy.receiveGift(self,gift)
        return ret

class MMProxy(object):
    def __init__(self,name,mm):
        self.name = name
        self.mm = mm
        self.checkTargetFns = [self.listenGoodBody,self.listenGoodMood]
        self.checkClientFns = [self.isWealthy,self.isHandsome]
    def receiveGift(self,client,gift):
        # 
        for fn in self.checkClientFns:
            if not fn(client):
                return '你还没有资格送礼物。'
        canSend = True
        for fn in self.checkTargetFns:
            if not fn():
                canSend = False
                break
        if canSend:
            ret = self.mm.receiveGift(gift)
            return ret
        else:
            return '女神不在状态，你还不行。'
        
    def listenGoodMood(self):
        if self.mm.mood == 'good':
            return True
        return False
    def listenGoodBody(self):
        return True if self.mm.body == 'good' else False
    def isWealthy(self,client):
        wealth = client.type
        if wealth == 'diaosi':
            return False
        if wealth == 'baofahu':
            return True
        if wealth == 'gaofushuai':
            return True
    def isHandsome(self,client):
        handsome = client.type
        if handsome == 'diaosi':
            return False
        if handsome == 'baofahu':
            return False
        if handsome == 'gaofushuai':
            return True

class MM(object):
    def __init__(self,name):
        self.name = name
        self._mood = 'good'
        self._body = 'good'
    @property
    def mood(self):
        return self._mood
    @mood.setter
    def mood(self,value):
        self._mood = value
    @property
    def body(self):
        return self._body
    @body.setter
    def body(self,value):
        self._body = value

    def receiveGift(self,gift):
        # 
        return '我也喜欢你耶！'

def test():
    xiaoming = Guy('diaosi')
    xiaogang = Guy('baofahu')
    xiaohua = Guy('gaofushuai')


    mm = MM('xiaohong')
    ahua = MMProxy('ahua',mm)

    feedback = xiaoming.giveGift('iphoneX...?',ahua)
    print('xiaoming feedback: ',feedback)
    feedback = xiaogang.giveGift('BMWX...?',ahua)
    print('xiaogang feedback: ',feedback)
    feedback = xiaohua.giveGift('beijing house!?',ahua)
    print('xiaohua feedback: ',feedback)

main = test

if __name__ == '__main__':
    main()




