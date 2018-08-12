'''
Encapsulates how a set of objects interact.
# 定义对象之间如何交互
# 飞行塔指挥飞机如何飞行

#################################################
GOF

The essence of the Mediator Pattern is to "define an object that encapsulates how a set of objects interact".
 It promotes loose coupling by keeping objects from referring to each other explicitly, 
 and it allows their interaction to be varied independently.
  Client classes can use the mediator to send messages to other clients,
   and can receive messages from other clients via an event on the mediator class.
#################################################

### 对象之间并不能交互，都是通过给终结者发送消息相互交互的。
'''

class Player(object):
    def __init__(self,name,color):
        self.name = name
        self.color = color
        self.state = 'alive'
    def setWin(self):
        print(self.name + 'win')
    def setLose(self):
        print(self.name + 'lose')
    def setDie(self):
        self.state = 'die'
        Director.receiveMsg('die',self)
    def remove(self):
        Director.receiveMsg('rm',self)

class Director(object):
    __players = {}
    @classmethod
    def addPlayer(cls,player):
        teamColor = player.color
        cls.__players[teamColor] = cls.__players.get(teamColor,None) or []
        cls.__players[teamColor].append(player)
    @classmethod
    def receiveMsg(cls,msgType,player):
        teamColor = player.color
        teamPlayers = cls.__players[teamColor]
        allDead = True
        for py in teamPlayers:
            if py.state != 'die':
                allDead = False
                break
        if allDead:
            for py in teamPlayers:
                py.setLose()
            for color in cls.__players:
                if color != teamColor:
                    for py in cls.__players[color]:
                        py.setWin()

def startGame():
    p1 = Player('1','red')
    p2 = Player('2','red')
    p3 = Player('3','red')
    p4 = Player('4','red')
    p5 = Player('5','red')

    p6 = Player('6','black')
    p7 = Player('7','black')
    p8 = Player('8','black')
    p9 = Player('9','black')
    p10 = Player('10','black')

    _ = [Director.addPlayer(p) for p in [p1,p2,p3,p4,p5,p6,p7,p8,p9,p10]]

    p1.setDie()
    p2.setDie()
    p3.setDie()
    p4.setDie()
    p5.setDie()

def main():
    startGame()

if __name__ == '__main__':
    main()

