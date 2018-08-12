# import os

# def child():
#    print('\nA new child ',  os.getpid())
#    os._exit(0)  

# def parent():
#    while True:
#       newpid = os.fork()
#       if newpid == 0:
#          child()
#       else:
#          pids = (os.getpid(), newpid)
#          print("parent: %d, child: %d\n" % pids)
#       reply = input("q for quit / c for new fork")
#       if reply == 'c': 
#           continue
#       else:
#           break

# parent()

import os
import sys

def main():
    print("hello world:%d",os.getpid())
    rc = os.fork()
    if rc < 0:
        sys.stderr.write("fork failed")
    elif rc == 0:
        print("hello,I am child:(pid:%d)",os.getpid())
    else:
        print("hello,I am parent of %d,(pid:%d)",rc,os.getpid())

if __name__ == '__main__':
    main()
















