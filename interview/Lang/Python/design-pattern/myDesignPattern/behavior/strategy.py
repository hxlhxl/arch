'''
最经典的策略模式就是 订单折扣
订单用策略初始化，策略中引用订单实例.

Context    ->   Strategy
    Order           Promotion
        total()         FidelityPromotion
        due()               discount()
                        BulkItemPromotion
                            discount()
                        LargeOrderPromotion
                            discount()
'''





from abc import  ABC,abstractmethod
from collections import namedtuple

# 返回属性有name和fidelity的Customer类
Customer = namedtuple('Customer','name fidelity')

class LineItem:
    def __init__(self,product,quantity,price):
        self.product = product
        self.quantity = quantity
        self.price = price
    def total(self):
        return self.price * self.quantity

class Order:    # the Context
    def __init__(self,customer,cart,promotion = None):
        self.customer = customer
        self.cart = list(cart)
        self.promotion = promotion
    def total(self):
        if not hasattr(self,'__total'):
            self.__total = sum(item.total() for item in self.cart)
            return self.__total

    def due(self):
        if self.promotion is None:
            discount = 0
        else:
            discount = self.promotion.discount(self)
        return self.total() - discount
    def __repr__(self):
        fmt = '<Order total: {:.2f} due {:.2f}>'
        return fmt.format(self.total(),self.due())

class Promotion(ABC):
    @abstractmethod
    def discount(self,order):
        '''return discount'''

class FidelityPromo(Promotion):
    def discount(self,order):
        return order.total() * .05 if order.customer.fidelity >= 1000 else 0

class BulkItemPromo(Promotion):
    def discount(self,order):
        discount = 0
        for item in order.cart:
            if item.quantity >= 20:
                discount += item.total() * .1
        return discount

class LargeOrderPromo(Promotion):
    def discount(self,order):
        # 创建一个set
        discount_items = {item.product for item in order.cart}
        print(discount_items,type(discount_items))
        if len(discount_items) >= 10:
            return order.total() * .07
        return 0


if __name__ == '__main__':
    joe = Customer('John Doe',0)
    ann = Customer('Ann Smith',1100)
    cart = [LineItem('banana',4,.5),
            LineItem('apple',10,1.5),
            LineItem('watermellon',5,5.0)]
    print(Order(joe,cart,FidelityPromo()))
    print(Order(ann,cart,FidelityPromo()))
    print(Order(ann,cart,LargeOrderPromo()))