'''

Allows the interface of an existing class to be used as another interface.

# baiduMap/googleMap/sosoMap
'''

class BaiduMap(object):
    def __init__(self):
        self.name = 'BaiduMap'
    def render(self):
        print('baiduMap rendering')

class GoogleMap(object):
    def __init__(self):
        self.name = 'GoogleMap'
    def render(self):
        print('GoogleMap rendering')

class SosoMap(object):
    def __init__(self):
        self.name = 'SosoMap'
    def display(self):
        print('SosoMap rendering')

class MapAdapter(object):
    def __init__(self,map,**adapted_method):
        self.map = map
        self.__dict__.update(adapted_method)
    def __getter__(self,attr):
        """
        所有的属性都通过被装饰的对象拿取
        """
        return getattr(self.obj,attr)

def render(map):
    map.render()

if __name__ == '__main__':
    baiduMap = BaiduMap()
    googleMap = GoogleMap()
    sosoMap = SosoMap()
    sosoMap = MapAdapter(sosoMap,render=sosoMap.display)
    
    render(baiduMap)
    render(googleMap)
    render(sosoMap)