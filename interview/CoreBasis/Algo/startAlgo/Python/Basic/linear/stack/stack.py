'''
Stack ADT
    Stack()
        创建一个新的空栈
    push(item)
        栈顶添加item元素
    pop()
        移除栈顶元素，并返回栈顶元素
    peek()
        查看栈顶元素
    is_empty()
        检查栈是否为空
    size()
        返回栈的包含item元素的数量
'''


class Stack(object):
    def __init__(self):
        self.stack = []
    def push(self,item):
        self.stack.append(item)
    def pop(self):
        return self.stack.pop()
    def peek(self):
        return self.stack[len(self.stack)-1]
    def is_empty(self):
        return True if len(self.stack) == 0 else False
    def size(self):
        return len(self.stack)

def test():
    stack = Stack()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    stack.push(4)
    stack.push(5)
    print(stack.stack)
    stack.pop()
    print(stack.stack)
    print('stack size is: ',stack.size())

if __name__ == '__main__':
    test()