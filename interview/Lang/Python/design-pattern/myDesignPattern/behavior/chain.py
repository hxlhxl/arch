


# # class DefaultHandler(object):
# #     def __init__(self):
# #         pass
# #     def after(self,handler):
# #         return self
# #         pass

# def after(func):
#     # ret = None
#     def handler(*args,**kwargs):
#         ret = func(*args,**kwargs)
#         # if ret == 'next':
#         #     return func(*args,**kwargs)
#         # return ret
#     handler.after = after
#     return handler


class Handler(object):
    def __init__(self):
        self.handlers = []
        pass
    def after(self,handler):
        self.handlers.append(handler)
        return self

    def handle(self,requests):
        for handler in self.handlers:
            ret = handler(requests)
            if ret != 'next':
                return ret

def handler_a(requests):
    print('handler_a handle requests: ',requests)
    return 'next'

def handler_b(requests):
    print('handler_b handle requests: ',requests)

def handler_c(requests):
    print('handler_c handle requests: ',requests)

def main():
    handler = Handler()
    handler.after(handler_a).after(handler_b).after(handler_c)
    requests = {'a':'aaaa handle'}
    handler.handle(requests)

if __name__ == '__main__':
    main()