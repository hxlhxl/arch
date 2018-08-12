# coding: utf8
class Node(object):
    def __init__(self,data,left=None,right=None):
        self.data = data
        self.left = left
        self.right = right

    def display(self):
        print(self.data)
        return self.data

'''
      1
  2       3
4   5    6
   7 8
'''


tree = Node(1,Node(2,Node(4),Node(5,Node(7),Node(8))),Node(3,Node(6)))


def lookup(root):
    stack = [root]
    while stack:
        # 队首元素
        current = stack.pop(0)
        current.display()
        if current.left:
            stack.append(current.left)
        if current.right:
            stack.append(current.right)

def deep(root):
    if not root:
        return
    root.display()
    deep(root.left)
    deep(root.right)

def maxDepth(root):
    if not root:
        return 0
    return max(maxDepth(root.left) , maxDepth(root.right)) + 1

def front_stack(root):
    
    if root is None:
        return
    stack = []
    node = root
    while node or stack:
        while node:
            node.display()
            stack.append(node)
            node = node.left
        # 返回中序node
        node = stack.pop()
        node = node.right

# 中序遍历: left-node middle-node right-node
def middle_stack(root):
    """4 2 7 5 8 1 6 3"""
    if root is None:
        return
    stack = []
    node = root
    while node or stack:
        while node:
            stack.append(node)
            node = node.left
        node = stack.pop()
        node.display()
        node = node.right

def end_stack(root):
    if root is None:
        return
    stack1 = []
    stack2 = []
    node = root
    stack1.append(node)
    # 构造后续顺序栈
    while stack1:
        node = stack1.pop()
        if node.left:
            stack1.append(node.left)
        if node.right:
            stack1.append(node.right)
        stack2.append(node)
    while stack2:
        stack2.pop().display()

if __name__ == '__main__':
    lookup(tree)
    print('----')
    deep(tree)
    print('----')
    md = maxDepth(tree)
    print(md)
    print('----')
    print('--front_stack--')
    front_stack(tree)
    print('--middle_stack__')
    middle_stack(tree)
    print('--end_stack--')
    end_stack(tree)
    