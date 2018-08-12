'''

抽象工厂模式(Abstract Factory Pattern)：提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。
两种皮肤工厂：SpringSkinFactory、SummerSkinFactory
每种皮肤工厂负责创建一簇具体类，如SpringButton、SpringText

'''

class SpringButton(object):
    def display(self):
        print('Spring Skin style Button')

class SpringText(object):
    def display(self):
        print('Spring Skin style Text')

class SummerButton(object):
    def display(self):
        print('Summer Skin style Button')

class SummerText(object):
    def display(self):
        print('Summer Skin style Text')

class SpringSkinFactory(object):
    def createButton(self):
        return SpringButton()
    def createText(self):
        return SpringText()

class SummberSkinFactory(object):
    def createButton(self):
        return SummberButton()
    def createText(self):
        return SummberText()

def classic_main():
    factory = SpringSkinFactory()
    bt = factory.createButton()
    tx = factory.createText()
    bt.display()
    tx.display()
    pass

def python_main():
    pass

if __name__ == '__main__':
    classic_main()
    print('---------------')
    python_main()