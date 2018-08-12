'''
encapsulate all information to perform an action or trigger an event.
without knowing who is responsible for the command or the command details
# 把一系列操作封装成命令，然后该命令会被某种对象调用，或者发送给某种对象调用。
'''

class Command(object):
    
    def execute(self):
        pass
    def undo(self):
        pass
    def redo(self):
        pass
    # cmd queue

def main():
    cmd = Command()
    # cmd作为参数给其他对象、函数调用
    cmd.execute()
    cmd.undo()
    cmd.redo()

if __name__ == '__main__':
    main()
        


