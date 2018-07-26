# monkey patch
from gevent from monkey
monkey.patch_all()

from lily_logging import InitLogging
import logging
InitLogging("lilyzt-crawler")

import os
import sys
from crawler import Crawler




log = logging.getLogger("lilyzt-crawler")
def main():
    crawler = Crawler()
    crawler.start()
    return 0

if __name__ == '__main__':
    sys.exit(main())