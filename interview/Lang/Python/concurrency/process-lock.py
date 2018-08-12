from multiprocessing import Process, Lock

def f(l, i):
    # l.acquire()
    print('hello world', i)
    i['a'] = 200
    # l.release()

if __name__ == '__main__':
    N = {'a':100}
    lock = Lock()

    for num in range(10):
        Process(target=f, args=(lock, N)).start()