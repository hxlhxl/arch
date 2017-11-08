# coding: utf-8
import logging
import time
import threading
from queue import Queue


logger = logging.getLogger()
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(asctime)s - %(message)s')
ch = logging.StreamHandler()
ch.setLevel(logging.DEBUG)
ch.setFormatter(formatter)
logger.addHandler(ch)

fibo_dict = {}
shared_queue = Queue()
input_list = [3, 10, 5, 7]


# Condition class implements condition variable objects. A condition variable allows one or more threads to wait until they are notified by another thread.
queue_condition = threading.Condition()


def fibonacci_task(condition):
    with condition:         # fibonacci_task thread acquire() the lock.
        while shared_queue.empty():
            logger.info("[%s] - waiting for elements in queue.."
            % threading.current_thread().name)
            # If the calling thread has not acquired the lock when this method is called, a RuntimeError is raised.
            condition.wait()    # fibonacci_task thread release() the lock
        else:
            value = shared_queue.get()
            a, b = 0, 1
            for item in range(value):
                a, b = b, a + b
                fibo_dict[value] = a    # 这里书中是fibo_dict[value] = a,但是觉得重复赋值没有意义
        time.sleep(30)        
        shared_queue.task_done()
        logger.debug("[%s] fibonacci of key [%d] with result [%d]" % (threading.current_thread().name, value,fibo_dict[value]))


def queue_task(condition):
    logging.debug('Starting queue_task...')
    with condition:
        for item in input_list:
            shared_queue.put(item)
            logging.debug("Notifying fibonacci_task threads that the queue is ready to consume..")
            condition.notifyAll()   
# wakes up one of the threads wating for the condition variable

threads = [threading.Thread(daemon=True, target=fibonacci_task,args=(queue_condition,)) for i in range(4)]
[thread.start() for thread in threads]

prod = threading.Thread(name='queue_task_thread', daemon=True,target=queue_task, args=(queue_condition,))

prod.start()
# time.sleep(3)
# Wait until the thread terminates. This blocks the calling thread until the thread whose join() method is called terminates – either normally or through an unhandled exception – or until the optional timeout occurs.
# When the timeout argument is present and not None, it should be a floating point number specifying a timeout for the operation in seconds (or fractions thereof). As join() always returns None, you must call is_alive() after join() to decide whether a timeout happened – if the thread is still alive, the join() call timed out.
# When the timeout argument is not present or None, the operation will block until the thread terminates.
# 阻塞调用线程，直到目标线程结束(正常或非正常)
[thread.join() for thread in threads]

print('app going end...')