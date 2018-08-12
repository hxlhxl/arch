import logging

from lib import do_something

def configLogger():
    logging.basicConfig(filename='simple.log',filemode='a',format='%(asctime)s:%(levelname)s:%(message)s',datefmt='%m/%d/%Y %I:%M:%S %p',level=logging.INFO)

def main():
    logging.info('logging started')
    do_something()
    logging.info('logging ended')

configLogger()
main()