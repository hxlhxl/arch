# _*_ coding:utf-8 _*_
import time, threading

# 假定这是你银行的存款
balance = 0

def change_it(n):
    # 先存后取，结果应该是0
    global balance
    balance = balance + n
    print("")   # 避免优化
    balance = balance - n
    print(balance)

def run_thread(n):
    for i in range(100):
        change_it(n)

t1 = threading.Thread(target=run_thread, args=(5,))
t2 = threading.Thread(target=run_thread, args=(8,))
t1.start()
t2.start()
t1.join()
t2.join()
print(balance)