# 对象池
# 在使用完一个对象之后，在GC之时重新放到池子里；或者在with使用之后放到池子里。

class ObjectPool(object):
    def __init__(self,queue,auto_get=False):
        self._queue = queue
        self.item = self._queue.get() if auto_get else None
    def __enter__(self):
        if self.item is None:
            self.item = self._queue.get()
        return self.item
    def __exit__(self,Type,value,traceback):
        if self.item is not None:
            self._queue.put(self.item)
            self.item = None
    def __del__(self):
        print('__del__ ing...')
        if self.item is not None:
            self._queue.put(self.item)
            self.item = None
def main():
    try:
        import queue
    except ImportError:
        import Queue as queue
    def test_object(queue):
        pool = ObjectPool(queue,True)
        print('Inside func: {}'.format(pool.item))
    sample_queue = queue.Queue()
    sample_queue.put('yam')
    with ObjectPool(sample_queue) as obj:
        print('Inside with: {}'.format(obj))
    print('Outside with: {}'.format(sample_queue.get()))

    sample_queue.put('sam')
    print('before __del__')
    test_object(sample_queue)
    print('after __del__')
    print('Outside func: {}'.format(sample_queue.get()))

    if not sample_queue.empty():
        print(sample_queue.get())

if __name__ == '__main__':
    main()