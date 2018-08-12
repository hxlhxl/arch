'''


# Adds behaviour to object without affecting its class.

# 飞机子弹的升级
'''


class Plane(object):
    def __init__(self,plane):
        self.plane = plane
        self.weapon = 'bullet'
    def fire(self):
        text = self.plane + 'fire' + self.weapon
        print(text)

class RPGWrapper(object):
    def __init__(self,wrapped):
        self._wrapped = wrapped
        self.weapon = 'RPG'
    def fire(self):
        text = self._wrapped.plane + 'fire' + self.weapon
        print(text)

class NueclearWrapper(object):
    def __init__(self,wrapped):
        self._wrapped = wrapped
        self.weapon = 'Nueclear'
    def fire(self):
        text = self._wrapped.plane + 'fire' + self.weapon
        print(text)
def main():
    plane = Plane('战斗机')
    plane.fire()

    rpgPlane = RPGWrapper(plane)
    rpgPlane.fire()

    nueclearPlane = NueclearWrapper(plane)
    nueclearPlane.fire()

if __name__ == '__main__':
    main()