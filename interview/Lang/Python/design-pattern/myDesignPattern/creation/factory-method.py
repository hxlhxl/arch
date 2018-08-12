'''

function: Creates objects without having to specify the exact class.

'''

class FileLogger(object):
    def writeLog(self):
        print("file logger writing logs")

class DbLogger(object):
    def writeLog(self):
        print('db logger writing logs')

class FileLoggerFactory(object):
    def createLogger(self):
        return FileLogger()

class DbLoggerFactory(object):
    def createLogger(self):
        return DbLogger()

def classic_main():
    factory = FileLoggerFactory()
    logger = factory.createLogger() # 这个地方可以通过配置文件实现。
    logger.writeLog()

def python_main():
    def getLogger(loggerType='file'):
        loggers = dict(file=FileLogger,db=DbLogger)
        return loggers[loggerType]()
    logger = getLogger('db')
    logger.writeLog()
    
if __name__ == '__main__':
    classic_main()

    python_main()
