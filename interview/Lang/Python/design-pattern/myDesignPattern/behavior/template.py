# coding: utf8
'''
    coffee or tea
    defines the skeleton of an algorithm,deferring steps to subclasses.
'''

from abc import ABC,abstractmethod

class Beverage(ABC):
    # 如果是__defaultIsAddCondiments这种私有变量是不可以作为钩子参数的
    _defaultIsAddCondiments = True

    def init(self):
        print('instance class name:',self.__class__)
        self.boilWater()
        self.brew()
        self.pourInCup()
        # hooks
        # 这里是一个搜寻属性的过程，如果本身没有，就会在服内中查找了。
        if self._defaultIsAddCondiments:
            self.addCondiments()

    def boilWater(self):
        print('煮开水')

    @abstractmethod
    def brew(self):
        '''brew'''

    @abstractmethod
    def pourInCup(self):
        '''pourInCup'''

    @abstractmethod
    def addCondiments(self):
        '''addCondiments'''    

class Tea(Beverage):
    def brew(self):
        print('用沸水浸泡茶叶')

    def pourInCup(self):
        print('把茶叶倒进杯子')
    
    def addCondiments(self):
        print('加柠檬')

class Coffee(Beverage):
    _defaultIsAddCondiments = False

    def brew(self):
        print('沸水冲泡咖啡')

    def pourInCup(self):
        print('咖啡倒进杯子')
    
    def addCondiments(self):
        print('加糖和牛奶')

def main():
    b = Tea()
    b.init()
    print('-' * 10)
    b = Coffee()
    b.init()

if __name__ == '__main__':
    main()