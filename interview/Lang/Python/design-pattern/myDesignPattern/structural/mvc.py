'''


Separates data in GUIs from the ways it is presented, and accepted.

'''



class Model(object):
    products = {
        'milk': {'price': 1.5,'quantity':10},
        'eggs': {'price': 0.2,'quantity':100},
        'cheese': {'price': 2.0,'quantity':10}
    }
    item_type = 'product'
    def __iter__(self):
        for item in self.products:
            yield item
    def get(self,product):
        try:
            return self.products[product]
        except KeyError as e:
            raise KeyError((str(e) + " not in model's item list"))

class View(object):
    def show_item_list(self,item_type,item_list):
        print(item_type.upper() + ' LIST:')
        for item in item_list:
            print(item)
        print('')
    def show_item_information(self,item_type,item_name,item_info):
        printout = 'Name: %s' % item_name
        for key,value in item_info.items():
            printout += (', ' + str(key) + ':' + str(value))
        printout += '\n'
        print(printout)
    def item_not_found(self, item_type, item_name):
        print('That %s "%s" does not exist in the records' %
              (item_type, item_name))
class Controller(object):
    def __init__(self,model,view):
        self.model = model
        self.view = view
    def show_items(self):
        items = list(self.model)
        item_type = self.model.item_type
        self.view.show_item_list(item_type,items)
    def show_item_information(self,item_name):
        try:
            item_info = self.model.get(item_name)
        except:
            item_type = self.model.item_type
            self.view.item_not_found(item_type,item_name)
        finally:
            item_type = self.model.item_type
            self.view.show_item_information(item_type,item_name,item_info)

def main():
    model = Model()
    view = View()
    controller = Controller(model,view)
    controller.show_items()
    controller.show_item_information('cheese')


if __name__ == '__main__':
    main()