
import abc

class Handler(object):
    __metaclass__ = abc.ABCMeta

    def __init__(self,successor=None):
        self._successor = successor
    
    def handle(self,request):
        res = self._handle(request)
        if not res:
            self._successor.handle(request)
    
    @abc.abstractclassmethod
    def _handle(self,request):
        raise NotImplementedError('Must provide implementation in subclass.')

class ConcreteHandler1(Handler):

    def _handle(self, request):
        if 0 < request <= 10:
            print('request {} handled in handler 1'.format(request))
            return True


class ConcreteHandler2(Handler):

    def _handle(self, request):
        if 10 < request <= 20:
            print('request {} handled in handler 2'.format(request))
            return True


class ConcreteHandler3(Handler):

    def _handle(self, request):
        if 20 < request <= 30:
            print('request {} handled in handler 3'.format(request))
            return True


class DefaultHandler(Handler):

    def _handle(self, request):
        print('end of chain, no handler for {}'.format(request))
        return True

class Client(object):
    def __init__(self):
        self.handler = ConcreteHandler1(ConcreteHandler2(ConcreteHandler3(DefaultHandler())))

    def delegate(self,requests):
        for request in requests:
            self.handler.handle(request)

def main():
    requests = [2, 5, 14, 22, 18, 3, 35, 27, 20]
    client = Client()
    client.delegate(requests)

if __name__ == '__main__':
    main(   )