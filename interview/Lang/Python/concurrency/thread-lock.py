# _*_ coding:utf-8 _*_
import time, threading

# 假定这是你银行的存款
balance = 0
lock = threading.Lock()

def change_it(n):
    # 先存后取，结果应该是0
    global balance
    balance = balance + n
    print("")   # 避免优化
    balance = balance - n
    print(balance)

def run_thread(n):
    for i in range(100):
        # 当多个线程同时执行lock.acquire()时，只有一个线程能成功地获取锁，然后继续执行代码，其他线程就继续等待直到获得锁为止。
        lock.acquire()
        try:
            change_it(n)
        finally:
            # 用try...finally来确保锁一定会被释放。
            lock.release()

t1 = threading.Thread(target=run_thread, args=(5,))
t2 = threading.Thread(target=run_thread, args=(8,))
t1.start()
t2.start()
t1.join()
t2.join()
print(balance)