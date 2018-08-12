'''
    Describes a group of objects that is treated as a single instance.
    # 组合对象
        |    \
       叶对象  组合对象
                  |
                 叶对象
    # 扫描文件：文件和文件夹的不同行为
'''

class CompositeObject(object):
    def __init__(self):
        self.objects = []
    def add(self,obj):
        self.objects.append(obj)
    def remove(self,obj):
        self.objects.remove(obj)
    def scan(self):
        for obj in self.objects:
            if isinstance(obj,self.__class__):
                obj.scan()
            else:
                print(obj)

def main():
    tree = CompositeObject()
    tree.add('FILE1')
    tree.add('FILE2')
    _dir = CompositeObject()
    _dir.add('FILE3')
    _dir.add('FILE4')
    tree.add(_dir) # add DIR

    tree.scan()

if __name__ == '__main__':
    main()