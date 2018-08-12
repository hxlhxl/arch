import sys


def fib(k):
    return 1 if k <= 2 else fib(k-1) + fib(k-2)


def runx(x):
    for i in range(x):
        print(fib(33))

def multi_thread(n):
    import threading
    for i in range(n):
        # 创建N个线程
        t = threading.Thread(target=runx,args=(int(10/n),))
        t.start()
    for t in threading.enumerate():
        if t is threading.currentThread():
            continue
        t.join()

multi_thread(int(sys.argv[1]))