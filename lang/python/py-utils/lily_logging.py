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
import os
import logging
import logging.config
import logging.handlers

from config import app_config


log = logging.getLogger(__name__)

class InitLogging:
    def __init__(self, logger_name):
        self.__load_app_log_config()
        self.__init_logging_format(logger_name)
        self.__init_logging_config(logger_name)

    def __load_app_log_config(self):
        self.log_config = app_config.get("logging")
        self.CONF_LOG_LEVEL = self.log_config.get("log_level", None) or 'INFO'
        self.LOGGING_MAX_BYTES = 10 * 1024 * 1024
    def __init_logging_format(self, logger_name):
        self.LOGGING_FORMAT = '%%(asctime)s | %%(levelname)s | @hxlhxl.%s | %%(name)s(%%(filename)s:%%(lineno)s) | %%(message)s' % logger_name
        self.LOGGING_DATE_FORMAT = "%Y-%m-%d %H:%M:%S %Z"
        levels = {
            'CRITICAL': logging.CRITICAL,
            'DEBUG': logging.DEBUG,
            'ERROR': logging.ERROR,
            'FATAL': logging.FATAL,
            'INFO': logging.INFO,
            'WARN': logging.WARN,
            'WARNING': logging.WARNING
        }
        self.LOGGING_LEVEL = levels[self.CONF_LOG_LEVEL]

    def __init_logging_config(self, logger_name):
        logging.basicConfig(
            format=self.LOGGING_FORMAT,
            level=self.LOGGING_LEVEL
        )
        # file logging
        log_file = self.log_config.get('%s_log_file' % logger_name)
        if os.access(os.path.dirname(log_file), os.R_OK | os.W_OK):
            file_handler = logging.handlers.RotatingFileHandler(log_file, maxBytes=self.LOGGING_MAX_BYTES, backupCount=1)
            formatter = logging.Formatter(self.LOGGING_FORMAT, self.LOGGING_DATE_FORMAT)
            file_handler.setFormatter(formatter)

            root_log = logging.getLogger()
            root_log.addHandler(file_handler)
        else:
            sys.stderr.write("Log file is unwritable: '%s'\n" % log_file)

if __name__ == '__main__':
    InitLogging("lilyzt-crawler")
    log = logging.getLogger("lilyzt-crawler")
    log.info("app starting......")
    log.debug("app starting......")
    log.fatal("app starting......")