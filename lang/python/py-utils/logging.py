"""
logging
    logging.basicConfig

logging.Logger
    setLevel
    addHandler
    removeHandler
    addFilter
    removeFilter
logging.Handler
    setLevel
    setFormatter
    addFilter
    removeFilter

    logging.StreamHandler
    logging.FileHandler
    logging.handlers.RotatingFileHandler
    logging.handlers.HTTPHandler
    logging.handlers.SMTPHandler
    logging.NullHandler
logging.Filter
logging.Formatter

logging模块，只import一次，用于初始化logger
"""

import logging
import logging.config
import logging.handlers

LOGGING_MAX_BYTES = 10 * 1024 * 1024

log = logging.getLogger(__name__)

class InitLogging:
    def __init__(self, logger_name):
        self.__init_logging_config()
        pass
    def __call__(self, logger_name):
        pass
    def __init_logging_config():
        pass
    def __init_logging():
        pass
    def init():
        pass

if __name__ == '__main__':
    InitLogging("lilyzt-crawler")